#include <stdio.h>
int main() {
    float x, y = 0;
    printf("Input x:");
    scanf("%f", &x);
    if (x >= 8 && x < 23) {
        y = -5 * x * x * x + 10;
        printf("y = %.2f", y);
    }
    else if (x < -19 || (x > -3 && x <= 0)) {
        y = 2 * x * x * x + 8 * x * x;
        printf("y = %.2f", y);
    }
    else
        printf("No value");

    return 0;
}