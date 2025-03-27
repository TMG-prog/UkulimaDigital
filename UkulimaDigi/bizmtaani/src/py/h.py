import re

def clean_description(text):
    text = re.sub(r"http\S+", "", text)  # Remove URLs
    text = re.sub(r"[^\w\s]", "", text)  # Remove special characters
    text = text.strip().lower()
    return text

description = "🔥 New Sneakers! Only $50! Buy now: http://shop.com"
print(clean_description(description))  # Output: "new sneakers only 50 buy now"