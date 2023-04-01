# Explanation

## Colour Theory

The difficulty in comparing colours is that they can be subjective.
That is why we can use a colour space to measure colour differences.
I have chosen to use the CIE Lab (CIELAB) colour space, as it was designed to approximate
human vision. RGB is used to represent colours in computers and phones, but CIELAB was designed to approximate
human colour perception.
CIELAB colour space is a uniform colour space, meaning that the perceptual difference between two colours is 
approximately equal to the Euclidean distance between their corresponding coordinates in the CIELAB space.
CIELAB colour space is represented by three coordinates: L,a,b. L = lightness's (0(black)-100(white)), a = 
green-red component (-ve = green, +ve = red), b = blue-yellow (-ve = blue, +ve = yellow).

## Calculating the Euclidean distance
ΔE = √((L1 - L2)² + (a1 - a2)² + (b1 - b2)²)
The Euclidean distance represents the perceived colour difference between two colours.
A smaller value means a smaller colour distance, and a larger one means a larger colour distance.
