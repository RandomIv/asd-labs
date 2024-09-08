#include <stdio.h>
#include<math.h>
int main() {
    int n, counter = 0;
    counter++; //автоматичне присвоєння
    scanf("%d", &n);
    counter++; //присвоєння
    double res = 1, sum;
    counter += 4; // 2 присвоєння рядком вище та присвоєння i, j нижче
    for(int i=1; i<=n; i++) {
        if (i != 1) counter++; //інкрементація і
        counter++;//порівняння i з n
        sum = 0;
        counter++; //присвоєння sum
        for (int j = 1; j <= i; j++) {
            if (j != 1) counter++;//інкрементація j
            counter++; //порівняння j з i
            sum += sin(j) + 1;
            counter += 4; //присвоєння, синус, додавання, ітерування
        }
        res *= i * (i + 1) / sum;
        counter += 5; //присвоєння, множення, ділення, додавання, ітерування
    }
    printf("%.7f\n", res);
    printf("%d", counter);
    return 0;
}