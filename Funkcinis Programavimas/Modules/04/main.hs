-- Laimonas Beniušis KM 1


import Test.QuickCheck
--EX 1
myLength :: [a] -> Integer
myLength = sum . map (\x-> 1)
-- function(element, accumulator) | starting value
myLength' :: [a] -> Integer
myLength' = foldr (\x n -> 1 + n) 0
list = [1..10]



-- EX2

-- using filter
myAny :: (a->Bool) -> [a] -> Bool
myAny f xs = length (filter f xs ) > 0

myAll :: (a->Bool) -> [a] -> Bool
myAll f xs = length (filter f xs ) == length xs


-- using map + fold
boolToInt :: Bool -> Int
boolToInt b = if b then 1 else 0

conditionSatisfiedCount cond xs = total
  where boolList =  map (cond) xs
        total = foldr(\x n -> n + boolToInt x) 0 boolList

myAll' :: (a->Bool) -> [a] -> Bool
myAll' f xs = conditionSatisfiedCount f xs == length xs
        
myAny' :: (a->Bool) -> [a] -> Bool
myAny' f xs = conditionSatisfiedCount f xs > 0





-- EX3
myUnzipEasy xs = (map fst xs, map snd xs)

myUnzip xs = foldr f ([],[]) xs
  where f =  \(a,b) (as,bs) -> (a:as, b:bs)

listOfPairs = [(1,1),(2,2),(3,3)]


-- EX4

ff :: Integer -> [Integer] -> Integer
ff bound list = ((addToBound bound).(multiplyBy 10).removeNegatives) list
  where
    removeNegatives = filter (>=0) 
    multiplyBy x = map(\a -> a*x )
    addToBound bound = foldr(\a n -> if (n + a) <= bound then n + a else n) 0 
    
    
-- EX5
myFlip2 :: (x -> y -> c ) -> (y -> x -> c)
myFlip2 = \f a b -> f b a
myFlip3 :: (x -> y -> z -> c ) -> (z-> y -> x -> c)
myFlip3 = \f a b c -> f c b a

-- test flip with some function
operation a b c = a - b + c
concatenate3 a b c = show (a) ++ show(b) ++ show(c)
concatenate2 a b = show (a) ++ show(b)
flipCheck3 f a b c = show (f a b c) ++ " flipped: " ++ show (myFlip3 f a b c)
flipCheck2 f a b = show (f a b) ++ " flipped: " ++ show (myFlip2 f a b)

res3 = flipCheck3 concatenate3 1 2 3
res2 = flipCheck2 concatenate2 1 2

-- EX6

tot :: (Integer -> Integer) -> (Integer -> Integer)
tot f n = foldr(\a n -> (f a) + n) 0 [0..n]

myTotal:: (Integer -> Integer) -> (Integer -> Integer)
myTotal f = \n -> foldr (\x y -> (f x) + y) 0 [0..n]

-- EX7

iter n f
  | n > 0 = f . (iter (n-1) f)
  | otherwise = id
  
  
iter' n f 
  | n > 0 = foldr(\x accumulator -> x . accumulator ) f listOfFunctions
  | otherwise = id
  where listOfFunctions = replicate (n-1) f

power numb p = (iter p (\n ->n*numb)) 1
iterTest n val = (iter n (\x -> x*2)) val 
iterTest' n val = (iter' n (\x -> x*2)) val

iterCheck n val = iterTest n val == iterTest' n val


-- EX8

splits :: [a] -> [([a],[a])]
splits xs = foldr(\x acc -> (splitAt x xs) : acc) [] [0..n]
  where n = length xs

main :: IO ()
main =  do
  print("Compiled")

