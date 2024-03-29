-- Laimonas Beniušis KM 1

module Sample where 


import Data.List
import Data.Char
--comments
{-

-}

-- Excersise 1
--average :: (Real a, Fractional b) => [a] -> b --generic
average :: [Float] -> Float --requested
average xs = realToFrac (sum xs) / genericLength xs


-- Excersise 2
divides :: Integer -> [Integer]
divides x = [a | a <- [1..x], x `mod` a == 0]
    
dividRecInner :: Integer -> Integer -> [Integer] -> [Integer]
dividRecInner a x xs
    | (a > 0) && (x `mod` a) == 0 = dividRecInner (a-1) x (a:xs)
    | (a > 0) = dividRecInner (a-1) x xs
    | otherwise =  xs
dividRec :: Integer -> [Integer]
dividRec a = dividRecInner a a []

    
isPrime :: Integer -> Bool
isPrime a = length(divides a ) == 2


-- Excercise 3
prefix :: String -> String -> Bool
prefix s1 s2 
    | length(s1) == 0 = True
    | length(s2) == 0 = False
    | length(s1) > length(s2) = False
    | otherwise = prefixInner s1 s2

prefixInner (x:s1) (y:s2)
    | length(s1) == 0 && e = True
    | e = prefix s1 s2
    | otherwise = False
    where e = (x == y)

substring :: String -> String -> Bool
substring s1 s2
    | length(s1) > length(s2) = prefix s2 s1
    | otherwise = prefix s1 s2
    
    
-- Excersise 4
permut :: [Integer] -> [Integer] -> Bool
permutInner (x:a) b 
    | length(a) == 0 = elem x b
    | elem x b = permutInner a b
    | otherwise = False
permut a b
    | length(a) /= length(b) = False
    | length(a) + length(b) == 0 = True
    | otherwise = permutInner a b

    
-- Excercise 5

capitalise :: String -> String
capitalise s = [toUpper a | a <- s, isAlpha a]

-- Excercise 6

itemTotal :: [(String,Float)] -> [(String,Float)]

getItemPriceSum :: String -> [(String,Float)] -> Float
getItemPriceSum name (selected:items)
    | null selected = 0
    | length(items) == 0 && selectedName == name = price
    | length(items) == 0 = 0
    | selectedName == name = price + getItemPriceSum name items
    | otherwise = 0 + getItemPriceSum name items
    where price = snd selected
          selectedName = fst selected
          
itemTotalInner :: [(String,Float)] -> [(String,Float)] -> [String] -> [(String,Float)] -> [(String,Float)]
itemTotalInner (selected:items) immutableList visited total
    | elem selectedName visited && length(items) == 0 = total
    | elem selectedName visited = itemTotalInner items immutableList visited total
    | length(items) == 0 = (newItem:total)
    | otherwise = itemTotalInner items immutableList (selectedName:visited) (newItem:total)
    where selectedName = fst selected
          newItem = (selectedName,newPrice)
          newPrice = getItemPriceSum selectedName immutableList 
    
itemTotal list = itemTotalInner list list [] []


itemDiscount :: String -> Integer -> [(String,Float)] -> [(String,Float)]
itemDiscountInner :: String -> Integer -> [(String,Float)] -> [(String,Float)] -> [(String,Float)]
itemDiscountInner name disc (selected:list) newList
    | sameName && empty = (newItem:newList)
    | empty = newList
    | sameName = itemDiscountInner name disc list (newItem:newList)
    | otherwise = itemDiscountInner name disc list (selected:newList)
    where selectedName = fst selected
          sameName = selectedName == name
          empty = length(list) == 0
          selectedPrice = snd selected
          newPrice = selectedPrice * (100-fromIntegral(disc))/100
          newItem = (selectedName, newPrice)

itemDiscount name disc list = itemDiscountInner name disc list []







