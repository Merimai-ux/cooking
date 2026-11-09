total = 0
while True:
    number = int(input("Число(0 - конец): "))
    if number == 0:
        break
    total += number
    print("Сумма:", total)
    