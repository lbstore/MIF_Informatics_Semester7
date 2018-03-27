
import Data.Maybe
import Control.Applicative
import Control.Monad

-- KM1 Laimonas Beniušis


-- !!!!!!!!!!!!ATTENTION!!!!!!!!!!!!

-- THROWS PATTERN MATCHING REDUNDANCY WARNINGS!

-- EX1

-- const Just "Hello" "World"
-- (,,,) Just 90 <*> Just 10 Just "Tierness" [1, 2, 3]

ex1_1 = const <$> Just "Hello" <*> Just "World"
ex1_2 = (,,,) <$> Just 90 <*> Just 10 <*> Just "Tierness" <*> Just [1,2,3]


-- EX2
-- derive (<*>) from the Monad primitivesn
-- changed name because of error:Ambiguous occurrence <*>

(<-=->) :: Monad f => f (a -> b) -> f a -> f b
f <-=-> g = do
    f1 <- f
    g1 <- g
    return (f1 g1)

f <-=-> g = 
    f >>= \f1 -> g >>= \g1 -> return (f1 g1)
    
    
justTest = Just (*2) <-=-> Just 3
listTest = [(*3)] <-=-> [1..9]

-- EX3

myLiftA :: (Applicative f) => (a -> b -> c) -> f a -> f b -> f c
myLiftA f x = (<*>) (fmap f x)

myLiftM :: (Monad f) => (a -> b -> c) -> f a -> f b -> f c
myLiftM f m1 m2 = do 
    x1 <- m1
    x2 <- m2
    return (f x1 x2)
  
myLiftM f m1 m2 = m1 >>= \x1 -> m2 >>= \x2 -> return (f x1 x2)
  
liftATest = (myLiftA replicate) [1,1,5] ['a','b','c']
liftMTest = (myLiftM replicate) [1,1,5] ['a','b','c']


myLiftM' :: (Monad f) => (a -> b -> f c) -> (f a -> f b -> f c)
myLiftM' f m1 m2 = do
    x1 <- m1
    x2 <- m2
    m3 <- f x1 x2
    return m3

liftMTest' = (myLiftM' replicate) [1,1,5] ['a','b','c']


-- using full do notation syntax, looks almost like C
main = do {
 
    putStr("Tests:\n");
    
    putStr("\n\tEX 1 (Fill missing code)\n\n");
    print(ex1_1);
    print(ex1_2);
    
    putStr("\n\tEX 2 (deriving <*> fron Monad primitives)\n\n");
    print(justTest);
    print(listTest);
    
    putStr("\n\tEX 3 (deriving lift functions)\n\n");
    print(liftATest);
    print(liftMTest);
    print(liftMTest');
     
}
    
    
