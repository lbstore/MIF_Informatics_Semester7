-- Laimonas Beniušis KM 1

module Sample where 


import Data.List
import Data.Ord
import Data.Char
import Data.Maybe

--comments
{-

-}


prefix :: String -> String -> Bool
prefix [] _ = True
prefix _ [] = False
prefix s1 s2 
    | length(s1) > length(s2) = False
    | otherwise = prefixInner s1 s2

prefixInner (x:s1) (y:s2)
    | length(s1) == 0 && e = True
    | e = prefix s1 s2
    | otherwise = False
    where e = (x == y)

substring :: String -> String -> Bool
substring s1 s2
    | length(s1) > length(s2) = False
    | prefix s1 s2 = True
    | substring s1 (tail s2) = True
    | otherwise = False


-- Ex 1

substInner oldSub newSub str newStr
    | prefix oldSub str = substInner oldSub newSub remain1 (newStr ++ newSub)
    | length str == 0 = newStr
    | otherwise =  substInner oldSub newSub remain2 (newStr ++ [firstChar])
    
    where   
        firstChar = head str
        remain1 = drop( length oldSub) str
        remain2 = tail str
        
        
subst :: String -> String -> String -> String
subst oldSub newSub st = substInner oldSub newSub st ""


-- Ex 2
alphabet = ['a'..'z'] ++ ['A'..'Z'] ++ ['0'..'9']
capitalise :: String -> String
capitalise s = [toUpper a | a <- s, elem a alphabet]

stringReverse str 
    | length str == 0 = ""
    | otherwise = stringReverse(remains) ++ [firstChar]
    where
        remains = tail str
        firstChar = head str
        
isPalin :: String -> Bool
isPalin str = str1 == str2
    where 
        str1 = capitalise str
        str2 = stringReverse( capitalise str)
    
    
-- Ex 3

countInstance what text 
    | length text == 0 = 0
    | otherwise = (countInstance what (tail text))+ add
    where add = if (prefix what text)
          then 1
          else 0

countWordInner text inWord
    | length text == 0 = if inWord then 1 else 0
    | otherwise = add + countWordInner (tail text) status 
    where 
        firstChar = head text
        status = elem firstChar alphabet
        add = if (inWord && not status) -- detect word ending
                 then 1
                 else 0
countWord text = countWordInner text False



countAllInner text inWord lines words chars
    | length text == 0 = (chars, finalWords, finalLines) --finished 
    | otherwise = countAllInner (tail text) isChar newLines newWords newChars
        where 
            firstChar = head text
            isChar = elem firstChar alphabet
            newChars = chars + if isChar then 1 else 0
            newLines = lines + if firstChar == '\n' then 1 else 0 -- extra line
            newWords = words + if (inWord && not isChar) then 1 else 0 -- word ending
            finalWords = words + if inWord then 1 else 0 -- text ends with word
            finalLines = lines + 1  -- text must have at least 1 line

count :: String -> (Int, Int, Int)
count text = countAllInner text False 0 0 0


-- Ex 4
whitespace = [' ','\n','\t']
getNextWordInner text inWord collected toSkip
    | length text == 0 || (not status && length collected > 0) = collected
    | otherwise = getNextWordInner (tail text) status newCollected toSkip
    where 
        firstChar = head text
        status = not (elem firstChar toSkip)
        newCollected =  if status then collected ++ [firstChar] else collected
        
getNextWord text = getNextWordInner text False "" whitespace


justifyInner text lineLen currentLine result
    | length text == 0 = newResult ++ currentLine ++ "\n"
    | length newWord > lineLen = error(newWord ++" is too long")
    | elem thisChar whitespace = justifyInner (tail text) lineLen currentLine result
    | otherwise = justifyInner newText lineLen newLine newResult
    where
        thisChar = head text
        newWord = getNextWord text
        dropLength = if length newWord > 0 then length newWord else 1
        newText = drop(dropLength) text
        potentialLine = currentLine ++ " " ++ newWord
        potLineTooLong = lineLen < length potentialLine
        addLine = if potLineTooLong then currentLine++"\n" else ""
        newLine = if potLineTooLong then newWord else potentialLine
        newResult = result ++ addLine
        
-- use putStr
justify :: String -> Int -> String
justify text lineLen = tail(justifyInner text lineLen "" "") -- remove first space
    
testString = "i have a lot\n of things to say, so just  \t \t want to make sure, it all fits nicely!"
      
      
-- Ex 5
data Shape = Circle Float Float Float | Rectangle Float Float Float Float
    deriving (Show, Ord, Eq)
    
surface :: Shape -> Float  
surface (Circle _ _ r) = pi * r ^ 2  
surface (Rectangle x y h w) = h * w 

distance x y x1 y1 = sqrt((x-x1)**2 + (y-y1)** 2)  

r1 = Rectangle 3 6 4 4
r2 = Rectangle 6 2 6 4
r3 = Rectangle 6 2 1 8
r4 = Rectangle 0 0 1 1




c1 = Circle 3 2 2
c2 = Circle 3 6 2
c3 = Circle 3 6 2.1

-- r11 r12 = False only touching
-- r11 r13 = True overlapping
r11 = Rectangle 3 1 2 2
r12 = Rectangle 1 3 2 2
r13 = Rectangle 1 3 2 2.1

-- if shapes are only touching, it's treated as not overlapping
overlaps :: Shape -> Shape -> Bool
overlaps (Rectangle x1 y1 h1 w1) (Rectangle x2 y2 h2 w2) = not (finalCondition1 || finalCondition2)
    where
        finalCondition1 = l1x >= r2x || l2x >= r1x
        finalCondition2 = l1y <= r2y || l2y <= r1y
        l1x = x1 - w1 / 2
        l1y = y1 + h1 / 2
        l2x = x2 - w2 / 2
        l2y = y2 + h2 / 2
        r1x = x1 + w1 / 2
        r1y = y1 - h2 / 2
        r2x = x2 + w2 / 2
        r2y = y2 - h2 / 2
              
        

        
overlaps (Rectangle x y h w) (Circle x1 y1 r) = condition
    where
        l1x = x - w / 2
        l1y = y + h / 2
        r1x = x + w / 2
        r1y = y - h / 2
        
        min1 = min x1 r1x
        min2 = min y1 l1y
        pointX = max l1x min1
        pointY = max r1y min2 
        deltaX = x1 - pointX
        deltaY = y1 - pointY
        condition = (deltaX**2 + deltaY**2) < (r**2)
 
overlaps (Circle x1 y1 r) (Rectangle x y h w) = overlaps (Rectangle x y h w) (Circle x1 y1 r)

overlaps (Circle x y r) (Circle x1 y1 r1) = distance x y x1 y1 < r + r1
    

-- Ex 6
removeAt n l 
    | n == 0 = tail l
    | otherwise = f ++ back
    where 
        sp = splitAt n l
        back = tail (snd sp)
        f = fst sp    
        
-- java-like indexOf operation    
indexOf element list 
    | condition == Nothing = (-1)
    | otherwise = fromJust(condition)
    where condition = elemIndex element list


data LoanStatus = Loaned | Free | Locked
    deriving (Show,Ord, Eq)
 
 
data Person = Person { name :: String
                     } deriving (Show, Ord, Eq)
                    
data LoanInfo = LoanInfo {  bookFK :: Int -- foreign key
                         , person :: Person
                         } deriving (Show, Ord, Eq)
data Book = Book {  title :: String
                 ,  bookID :: Int
                 ,  loaned :: LoanStatus
                 } deriving (Show, Ord, Eq)
                 



sortByID :: [Book] -> [Book]
sortByID = sortBy (comparing bookID)


loan :: Person -> Book -> ([Book],[LoanInfo]) -> ([Book],[LoanInfo])
loan person book (bookDB,loanDB) 
    | findBookIndex == (-1) = error("No such book in DB")
    | otherwise = (sortByID (newBookDB),newLoanDB)
    where 
        findBookIndex = indexOf book bookDB
        findBook = bookDB !! findBookIndex
        findBookStatus = loaned findBook
        loanCommit = findBookStatus == Free
        removedBookDB = if loanCommit then removeAt findBookIndex bookDB else bookDB
        changedBook = Book (title findBook) (bookID findBook) Loaned
        newLoan = LoanInfo (bookID findBook) person
        newBookDB = if not loanCommit then 
                        removedBookDB 
                    else
                        removedBookDB ++ [changedBook]
        newLoanDB = if not loanCommit then 
                        loanDB
                    else
                        loanDB ++ [newLoan]
     
findLoanByBookID bkID loans curIndex      
    | currentID == bkID = curIndex
    | length loans == 0 = -1
    | otherwise  = findLoanByBookID bkID (tail loans) (curIndex+1)
    where 
        selected = head loans
        currentID = bookFK selected
        
-- Bonus return function for the sake of it
returnBook :: Book -> ([Book],[LoanInfo]) -> ([Book],[LoanInfo])
returnBook book (bookDB,loanDB) 
    | findBookIndex == (-1) = error("No such book in DB")
    | otherwise = (sortByID (newBookDB),newLoanDB)
    where 
        findBookIndex = indexOf book bookDB
        findBook = bookDB !! findBookIndex
        findBookStatus = loaned findBook
        loanCommit = findBookStatus == Loaned
        removedBookDB = if loanCommit then removeAt findBookIndex bookDB else bookDB
        changedBook = Book (title findBook) (bookID findBook) Free
        findLoanIndex = findLoanByBookID (bookID findBook) loanDB 0
        newBookDB = if not loanCommit then 
                        removedBookDB 
                    else
                        removedBookDB ++ [changedBook]
        newLoanDB = if not loanCommit then 
                        loanDB
                    else
                        removeAt findLoanIndex loanDB
  
  
b1 = Book "Real World Haskell" 1 Free
b2 = Book "Real World Haskell" 2 Locked
b3 = Book "Learn You a Haskell for Great Good!" 3 Loaned
bookDB =[b1, b2, b3]
loan1 = LoanInfo 3 (Person "Gary")
loanDB = [loan1]

p1 = Person "Tom"
res =  loan p1 b1 (bookDB,loanDB)
res1 = returnBook b3 (bookDB,loanDB)



        
