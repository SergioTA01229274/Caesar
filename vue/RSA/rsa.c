#include <gmp.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>

#define BIT_COUNT 1024
#define BASE 16

char * prime()
{
    mpz_t rand;
    mpz_init(rand);
    gmp_randstate_t rstate;
    gmp_randinit_default(rstate);
    gmp_randseed_ui(rstate,time(NULL));
    do {
        mpz_urandomb(rand,rstate,BIT_COUNT);
    } while(mpz_probab_prime_p(rand,50)==0);
    gmp_randclear(rstate);
    char * tmp = mpz_get_str(NULL,BASE,rand);
    mpz_clear(rand);
    return tmp;
}

char * getN(mpz_t p, mpz_t q)
{
    mpz_t n;
    mpz_init(n);
    mpz_mul(n,p,q);
    // gmp_printf("value of n: %Zd\n", n);
    // char * dec = mpz_get_str(NULL,10,n);
    // char * hex = mpz_get_str(NULL,16,n);
    // char * tmp = calloc(strlen(dec)+strlen(",")+strlen(hex)+1,sizeof(char));
    // strcat(tmp,dec);
    // strcat(tmp,",");
    // strcat(tmp,hex);
    // return tmp;
    char * tmp = mpz_get_str(NULL,BASE,n);
    mpz_clear(n);
    return tmp;
}

char * getPHI(mpz_t p, mpz_t q)
{
    mpz_t phi,
          one,
          deltaP,
          deltaQ;
    mpz_init(phi);
    mpz_init_set_ui(one, 1);
    mpz_init(deltaP);
    mpz_init(deltaQ);
    mpz_sub(deltaP,p,one);
    mpz_sub(deltaQ,q,one);
    mpz_mul(phi, deltaP, deltaQ);
    // gmp_printf("value of one: %Zd\n", one);
    // gmp_printf("value of ∂p: %Zd\n", deltaP);
    // gmp_printf("value of ∂q: %Zd\n", deltaQ);
    // gmp_printf("value of phi: %Zd\n", phi);
    char * tmp = mpz_get_str(NULL,BASE,phi);
    mpz_clear(phi);
    mpz_clear(one);
    mpz_clear(deltaP);
    mpz_clear(deltaQ);
    return tmp;
}

char * getE(mpz_t phi)
{
    unsigned long int e_int = 65537;
    mpz_t gcd;
    mpz_init(gcd);

    while(true)
    {
        mpz_gcd_ui(gcd,phi,e_int);
        if(mpz_cmp_ui(gcd,(unsigned long int)1)==0)
        {
            break;
        }
        e_int += 2;
    }
    mpz_t e;
    mpz_init(e);
    mpz_set_ui(e,e_int);
    mpz_clear(gcd);
    // gmp_printf("value of e: %Zd\n", e);
    char * tmp = mpz_get_str(NULL,BASE,e);
    mpz_clear(e);
    return tmp;
}

char * getD(mpz_t e, mpz_t phi)
{
    mpz_t d;
    mpz_init(d);
    mpz_invert(d,e,phi);
    // gmp_printf("value of d: %Zd\n", d);
    char * tmp = mpz_get_str(NULL,BASE,d);
    mpz_clear(d);
    return tmp;
}

void generateKey(){
    mpz_t p,
          q,
          phi_mpz,
          e_mpz;
    char * n, 
         * phi,
         * e, 
         * d;
    mpz_init(p);
    mpz_init(q);
    mpz_init(phi_mpz);
    mpz_init(e_mpz);
    mpz_set_str(p,prime(),BASE);
    sleep(2);
    mpz_set_str(q,prime(),BASE);
    // gmp_printf("value of p: %Zd\n", p);
    // gmp_printf("value of q: %Zd\n", q);
    n = getN(p,q),
    phi = getPHI(p,q);
    mpz_set_str(phi_mpz,phi,BASE);
    e = getE(phi_mpz);
    mpz_set_str(e_mpz,e,BASE);
    d = getD(e_mpz,phi_mpz);

    FILE *fp;
    fp = fopen("key.json","w");
    if (!fp) 
    {
        printf("Error, Failed to open the file! \n");
    }
    fprintf(fp, "{\n");
    fprintf(fp, "\t\"public\":{\n");
    fprintf(fp, "\t\t\"n\": \"%s\",\n", n);
    fprintf(fp, "\t\t\"e\": \"%s\"\n", e);
    fprintf(fp, "\t}\n,");
    fprintf(fp, "\t\"private\":{\n");
    fprintf(fp, "\t\t\"d\": \"%s\"\n", d);
    fprintf(fp, "\t}\n");
    fprintf(fp, "}\n");
    /*
    FILE *fp;
    fp = fopen("key.txt","w");
    if (!fp) 
    {
        printf("Error, Failed to open the file! \n");
    }
    fprintf(fp, "-----BEGIN RSA PRIVATE KEY-----\n");
    fprintf(fp, "%s" "%s\n", "d: ", d);
    fprintf(fp, "-----END RSA PRIVATE KEY-----\n");
    fprintf(fp, "-----BEGIN CERTIFICATE-----\n");
    fprintf(fp, "%s" "%s\n", "n: ", n);
    fprintf(fp, "%s" "%s\n", "e: ", e);
    fprintf(fp, "-----END CERTIFICATE-----\n");
    fclose(fp);
    //mpz_clear(p);
    //mpz_clear(q);
    //mpz_clear(phi_mpz);
    //mpz_clear(e_mpz);
    */
}

int main(int argc, char const *argv[])
{
    /*char *tmp = prime();
    double time_spent = 0.0;
    clock_t begin = clock();
    printf("%s\n", tmp);
    for (int i = 0; i < 100000; i++)
    {
        char *tmp2 = prime();
        if (strcmp(tmp, tmp2)!=0){
            clock_t end = clock();
            printf("Primo:    %s\n", tmp2);
            tmp = tmp2;
            time_spent += (double)(end - begin) / CLOCKS_PER_SEC;
            printf("Time elpased is %f seconds", time_spent);
            begin = clock();
            time_spent = 0.0;
        }
    }*/

    generateKey();

    return 0;
}