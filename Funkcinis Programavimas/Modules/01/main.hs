-- Laimonas Beniušis KM 1

module Sample where 

import Test.QuickCheck

import System.IO
import Test.QuickCheck

minInt = minBound :: Int
maxInt = maxBound :: Int

exOr :: Bool -> Bool -> Bool
exOr x y = (x || y) && not( x && y)



-- Exercize 1
nAndOriginal :: Bool -> Bool -> Bool
nAndOriginal x y = not(x && y)

nAnd1 True x = not (x)
nAnd1 x True = not (x)
nAnd1 False _ = True
--nAnd1 _ False = True



--Truth table
nAnd2 True True = False
nAnd2 True False = True
nAnd2 False True = True
nAnd2 False False = True
    


-- Exercize 2
-- adtional property

nAnd3 x y = not x || not y 
              
              
prop_nAnd :: Bool -> Bool -> Bool
prop_nAnd x y = (nAndOriginal x y ==  nAnd1 x y) && (nAnd2 x y == nAnd3 x y)

prop_nAnd2 x y 
    |  x == False || y == False = True == nAnd2 x y
    | otherwise = False == nAnd2 x y

-- Exercize 3
nDigits :: Integer -> Int
nDigits x
    | x >= 0 = length(show x) 
    | x < 0 = nDigits(abs x) 
         
         
-- Exercise 4
nRoots :: Float -> Float -> Float-> Int
nRoots a b c 
    | a == 0 = error "the first argument must be non-zero"
    | (b^2) >  d = 2
    | (b^2) == d = 1
    | (b^2) <  d = 0
    where d = 4.0 * a * c
    
       
-- Exercise 5


getRootNested :: Float -> Float -> Float -> Float -> Float
getRootNested a b c m = (m*b + (sqrt(b^2 - 4.0 * a * c))) / (2.0 * a)



getRoot :: Float -> Float -> Float -> (Float,Float)
getRoot a b c | nRoots a b c == 0 = error "No roots"
              | nRoots a b c > 1 = (getRootNested a b c 1.0 , getRootNested a b c (-1.0))
              | otherwise  = (getRootNested a b c 1.0 ,getRootNested a b c 1.0)    
              
smallerRoot :: Float -> Float -> Float -> Float
smallerRoot a b c = min a1 a2
    where 
        a1 = fst (getRoot a b c)
        a2 = snd (getRoot a b c)

largerRoot :: Float -> Float -> Float -> Float
largerRoot a b c = max a1 a2
    where 
        a1 = fst (getRoot a b c)
        a2 = snd (getRoot a b c)
        
        
        
-- Exercise 6

power2 :: Integer -> Integer
power2 x    | x == 0 = 1
            | x > 0 = 2 * power2(x-1)
            | x < 0 = 0
            
            
-- Exercise 7
mult :: Integer -> Integer -> Integer
mult 0 m = 0
mult n 0 = 0
mult m n 
    | m < n = mult n m                  -- minimizing recursion stack
    | m < 0 && n < 0 = mult a b         -- both negative makes positive
    | m < 0 || n < 0 = (-1) * mult a b  -- one negative makes negative
    | otherwise = m + mult m (n-1)
    where a = abs m
          b = abs n

          
-- Exercise 8
prod :: Integer -> Integer -> Integer
prod m n
    |m < n = m * prod (m+1) n
    |m > n = error "Invalid range"
    |m == n = n
    

fac :: Integer -> Integer
fac n = prod 1 n





