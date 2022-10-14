
from nltk.corpus import words
from random import sample
nltk.download('words')

print(sample(words.words(), n))
