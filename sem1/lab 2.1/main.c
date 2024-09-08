#include <stdio.h>
int main() {
    int n, m;
    printf("Rows:");
    scanf("%d", &n);
    printf("Columns:");
    scanf("%d", &m);
    double X, A[n][m];
    printf("X:");
    scanf("%lf",&X);
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            scanf("%lf", &A[i][j]);
        }
    }
    int mid, l = 0, r = n-1;
    for (int i = 0; i < n; ++i) {
        mid = 0, l = 0, r = n-1;
        while(l<r) {
            mid=(l+r)/2;
            if(X>A[i][mid]){
                l=mid+1;
            }
            else{
                r=mid;
            }
        }
        if(X == A[i][l]){
            printf("row:%d column:%d", i, l);
            return 0;
        }
    }
    printf("element not found");
    return 0;
}
