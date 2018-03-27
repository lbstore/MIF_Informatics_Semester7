import Control.Applicative
import qualified Data.Set as S
import Data.List

-- EX 1

{- Changes:
EX 3 new implementation
EX 7 list comparison
EX 4 added depth and map functions using "map" instead of foldr
-}

data Valuation a = Valuation {name::Var,value::a}
data Expr a = Lit a | EVar Var | OP ([Expr a] -> a) [Expr a]
type Var = String


substitute :: [Valuation a] -> Var -> a
substitute valuations lookFor 
  | length(valuations) == 0 = error ("Can't bind " ++ lookFor)
  | firstName == lookFor = value first
  | otherwise = substitute remainder lookFor
  where
    first = head(valuations)
    firstName = name first
    remainder = tail(valuations)

eval  (Lit a) = a
eval  (EVar a) = error ("Not bound "++a)
eval  (OP f list) = f list


recSub (valuations,expr) = 
  case expr of 
    Lit a -> Lit a
    EVar n -> Lit (substitute valuations n)
    OP f expressions -> OP f (foldr(\ex full -> recSub(valuations,ex):full) [] expressions)




evalFull valuations expression = eval final
  where final = recSub(valuations,expression)


evalTest = do 
  let funcSum expressions = (foldr(\x stotal -> stotal + (eval x) ) 0 expressions)

  let expList = [Lit 1, Lit 2, EVar "a"]
  let e1 = OP funcSum expList
  
  let v1 = Valuation "a" 10
  let v2 = Valuation "b" 7
  let fullExp = OP funcSum [e1,Lit 10, EVar "b"]
  let res = evalFull [v1,v2] fullExp
  print res
  

-- EX 2
data Nlist = Nlist [Float] 
  deriving (Show)

showNlist (Nlist a) = show a

nlistAverage :: Nlist -> Float
nlistAverage (Nlist []) = 0
nlistAverage (Nlist list) = (sum list) / len
  where len = fromIntegral(length(list))

instance Eq Nlist where
  a == b = nlistAverage (a) == nlistAverage (b)
  
instance Ord Nlist where
  a <= b = nlistAverage (a) <= nlistAverage (b)
  

nlistTest = do
  let list1 = Nlist [1,2,3,4]
  let list2 = Nlist [4,2,2,2]
  let list3 = Nlist [1,2,3,3]
  let lists = [list1,list2,list3]
  let sorted = (sort lists)
  print sorted
  print (list1 == list2)

-- EX 3

-- Old implementation

-- liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c
-- fmap :: Functor f => (a -> b) -> f a -> f b
-- pure :: Applicative f => a -> f a
-- instance (Num a, Num b) => Num (a->b) where
--   negate      = fmap negate
--   (+)         = liftA2 (+)
--   (*)         = liftA2 (*)
--   fromInteger = pure . fromInteger
--   abs         = fmap abs
--   signum      = fmap signum
  
-- CHANGED
  
instance (Num a, Num b) => Num (a->b) where
  negate f        = negate . f
  f + g           = \x -> f x + g x
  f * g           = \x -> f x * g x
  fromInteger n   = \x -> fromInteger n
  abs f           = abs . f
  signum f        = signum . f  
  
  
numTest = do
  let eight = ((*2) * (*2) * (*2)) 1 -- 1*2*2*2
  print eight
  let alsoEight = (((*2) + (*2)) * (*2)) 1 -- (1*2+1*2)*2
  print alsoEight
  let six = ((*2) + (*2) * (*2)) 1 -- 1*2+1*2*2
  print six

-- EX 4
data GTree a = Leaf a | Gnode [GTree a]
  deriving (Show)

dfs f (Leaf a) =  f a
dfs f (Gnode leafs)  =  
  if length(leafs) > 0  then
    if dfs f firstValue  then True
    else dfs f remainder
  else False
  where 
    firstValue = head leafs
    remainder = Gnode (tail leafs)

dfsOccurs value node = dfs (==value) node

dfsDepth' step (Leaf a) = [step] 
dfsDepth' step (Gnode leafs) 
  | length(leafs) > 1  =
     dfsDepth' inc firstValue ++ dfsDepth' step remainder
  | length(leafs) == 1 = dfsDepth' inc firstValue
  | otherwise = []
  where 
    firstValue = head leafs
    remainder = Gnode (tail leafs)
    inc = step + 1 

dfsDepth (Leaf a) = 0
dfsDepth (Gnode node) = maximum depthList
  where depthList = dfsDepth' 0 (Gnode node)

dfsToList (Leaf a) = [a] 
dfsToList (Gnode leafs)  =  
  if length(leafs) > 0  then
    (dfsToList firstValue) ++ (dfsToList remainder)
  else []
  where 
    firstValue = head leafs
    remainder = Gnode (tail leafs)


dfsShow (Leaf a) = " "++(show a)++" "
dfsShow (Gnode leafs) = "["++(foldr(\x str ->  dfsShow(x) ++ str) "" leafs)++"]"

tr = Gnode [Leaf 1, Gnode [Leaf 2, Leaf 3, Gnode[Leaf 4]], Leaf 5]

    
dfsCopy (Leaf a) = Leaf (a)
dfsCopy (Gnode leafs) = Gnode (foldr(\x lf -> dfsCopy(x) : lf) [] leafs)

dfsMap f (Leaf a) = Leaf (f a)
dfsMap f (Gnode leafs) = Gnode (foldr(\x lf -> dfsMap f (x) : lf) [] leafs)


-- USING MAP
depth :: GTree a -> Int
depth (Leaf a) = 0
depth (Gnode leafs) = 1 + maximum (map depth leafs)


dMap ::(a->a) -> GTree a -> GTree a
dMap f (Leaf v) = Leaf (f v)
dMap f (Gnode leafs) = Gnode( map (dMap f) leafs)

treeTest = do
  let tree = Gnode [Leaf 1, Gnode [Leaf 2, Leaf 3, Gnode[Leaf 4]], Leaf 5]
  print tree
  let dd = dfsDepth' 0 tree
  print "Depth list:"
  print dd
  let d = dfsDepth tree
  print "Depth:"
  print d
  print "DFS traversal:"
  print (dfsShow tree)
  print "Mapped +1:"
  print (dMap (+1) tree)
  

-- EX 5

data Result a = OK a | Error String 
  deriving (Show)


-- not user
errorDiv :: Float -> Float -> Result Float
errorDiv val d 
  | d == 0 = Error "Devision by zero"
  | otherwise = OK (val / d)
  
errorLog :: Float -> Float -> Result Float
errorLog base val
  | (errCase0) || (errCase1) || (errCase2) = Error "Math error"
  | otherwise = OK res
  
  where 
    errCase0 = val <= 0
    errCase1 = base <= 0
    errCase2 = base == 1
    res = logBase base val
    
    
-- compResult :: (a -> Result b) -> (b -> Result c) -> (a -> Result c)


-- used
err1 :: Float -> Result Float
err1 val 
  | val < 0 = Error "Not positive"
  | otherwise = OK val
  
err2 :: Float -> Result Float
err2 val 
  | val > 100000 = Error "TOO BIG"
  | otherwise = OK val
  
cc = compResult err1 err2 



cmp f g x = f x >>= g

compResult f g x = 
  case res of 
    Error str -> res
    OK val -> g val
  where res = f x
                      
compTest = do
  let cc = compResult err1 err2 
  print (cc 5)
  print (cc (10^10))
  print (cc (-5))
                      
                      
-- EX 6


type Relation a b = S.Set(a,b)


ran :: Ord b => Relation a b -> S.Set b
ran rel = S.fromList rangeList
  where 
    rangeList = foldr(\(x,y) acc -> y:acc) [] relList
    relList = S.toList rel


dom :: Ord a => Relation a b -> S.Set a
dom rel = S.fromList rangeList
  where 
    rangeList = foldr(\(x,y) acc -> x:acc) [] relList
    relList = S.toList rel  
    

image :: (Ord a, Ord b) => S.Set a -> Relation a b -> S.Set b
image domSet rel = S.fromList imageList
  where 
    imageList = foldr(\(x,y) acc -> if S.member x domSet then y:acc else acc) [] relList
    relList = S.toList rel

imageTest = do
    
    let testRelation = S.fromList[(1,"one"),(2,"two"),(3,"three")]
    let domSet = S.fromList[1,3]
    print("Relation:")
    print(testRelation)
    print("Range test")
    print(ran testRelation)
    print("Domain test")
    print(dom testRelation)
    
    print("Dom set")
    print(domSet)
    print("ImageTest")
    print(image domSet testRelation)
    print("Done")

-- EX 7

isPrime x = not(any (\n -> x `rem` n  == 0) (2:[3,5..bound]))
  where bound = round (sqrt (fromIntegral  x))
  
primeList = 2:(filter isPrime ([3,5..]))

primeSieve = sieve [2..]
  where
    sieve (x:xs) = x : sieve [y | y <- xs, y `rem` x > 0]

goldbachInner :: Int -> [Int] -> Int  -> Int -> (Int,Int)
goldbachInner n primes index1 index2
  | (prime1 > n ) = (0,0) -- serves as an error value
  | (prime2 > n ) = goldbachInner n primes (index1+1) (index1+1)
  | (prime1 + prime2 == n) = (prime1,prime2)
  | otherwise =  goldbachInner n primes (index1) (index2+1)
    where prime1 = primes !! index1
          prime2 = primes !! index2
          
goldbachExpr :: Int -> (Int,Int)
goldbachExpr n = goldbachInner n primes 0 0
  where 
    -- primes = 2:(filter isPrime ([3,5..]))
    primes = primeSieve

goldbach :: Int -> Bool
goldbach n = all (\x -> goldbachExpr(x) /= (0,0) ) [4,6..n]

-- LIST COMPARE

goldbachBound n = ltf(expressableNumbers) / ltf(evenList)
  where 
    evenList = [4,6..n]
    expressableNumbers = [x | x <- evenList, goldbachExpr(x) /= (0,0)]
    ltf = \x -> fromIntegral(length(x))
    
goldbachTest n = do
  if (n<4 || (n `rem` 2 /=0)) then 
    return()
  else do
    print (show(n)++" "++ show(goldbachExpr(n)))
    goldbachTest(n-2)
    
    
-- EX 8

data Stream a = Cons a (Stream a)

streamIterate :: (a -> a) -> a -> Stream a
streamIterate f x = Cons x (streamIterate f (f x))
  
streamToList :: Stream a -> [a]
streamToList (Cons x xs) = x : streamToList xs

streamInterleave :: Stream a -> Stream a -> Stream a
streamInterleave (Cons x xs) ys = Cons x (streamInterleave ys xs)

streamTake :: Integer -> Stream a  -> [a]
streamTake n (Cons x xs)
  | n > 0     =  x : (streamTake (n - 1) xs)
  | otherwise = []

negStream = streamIterate (\x -> x - 1) (-1)
posStream = streamIterate (\x -> x + 1) (1)

integers = (Cons 0) (streamInterleave posStream negStream)

streamTest = do
  let negStream = streamIterate (\x -> x - 1) (-1)
  let posStream = streamIterate (\x -> x + 1) (1)
  let integers = (Cons 0) (streamInterleave posStream negStream)
  let amount = 10
  print ("First "++(show amount) ++" integers")
  print(streamTake amount integers)

main = do
  print("Compiled")








