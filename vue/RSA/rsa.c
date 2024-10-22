#include <gmp.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <string.h>
#include <stdbool.h>

#define BIT_COUNT 1024
#define BASE 10

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
    char * tmp = mpz_get_str(NULL,BASE,phi);
    mpz_clear(phi);
    mpz_clear(one);
    mpz_clear(deltaP);
    mpz_clear(deltaQ);
    return tmp;
}

char * getE(mpz_t phi)
{
    mpz_t gcd;
    mpz_init(gcd);
    mpz_t rand;
    mpz_init(rand);
    gmp_randstate_t rstate;
    gmp_randinit_default(rstate);
    gmp_randseed_ui(rstate,time(NULL));
    while (mpz_get_ui(gcd)!=1)
    {
        do {
            mpz_urandomm(rand,rstate,phi);
        } while(mpz_probab_prime_p(rand,50)==0);
        mpz_gcd(gcd,rand,phi);
    }
    gmp_randclear(rstate);
    char * tmp = mpz_get_str(NULL,BASE,rand);
    mpz_clear(rand);
    mpz_clear(gcd);
    return tmp;
}

char * getD(mpz_t e, mpz_t phi)
{
    mpz_t d;
    mpz_init(d);
    mpz_invert(d,e,phi);
    char * tmp = mpz_get_str(NULL,BASE,d);
    mpz_clear(d);
    return tmp;
}

void generateKeyJSON(){
    mpz_t p,
          q,
          phi_mpz,
          e_mpz;
    mpz_init(p);
    mpz_init(q);
    mpz_init(phi_mpz);
    mpz_init(e_mpz);
    mpz_set_str(p,prime(),BASE);
    sleep(2);
    mpz_set_str(q,prime(),BASE);
    char * n = getN(p,q);
    char * phi = getPHI(p,q);
    mpz_set_str(phi_mpz,phi,BASE);
    char * e = getE(phi_mpz);
    mpz_set_str(e_mpz,e,BASE);
    char * d = getD(e_mpz,phi_mpz);

    FILE *fp;
    fp = fopen("key.json","w");
    if (!fp) 
    {
        printf("Error, Failed to open the file! \n");
    }
    mpz_t b2b_n,
          b2b_e,
          b2b_d;
    mpz_init(b2b_n);
    mpz_init(b2b_e);
    mpz_init(b2b_d);
    mpz_set_str(b2b_n,n,BASE);
    mpz_set_str(b2b_e,e,BASE);
    mpz_set_str(b2b_d,d,BASE);
    fprintf(fp, "{\n");
    fprintf(fp, "\t\"public\":{\n");
    fprintf(fp, "\t\t\"n\": \"%s\",\n", mpz_get_str(NULL,16,b2b_n));
    fprintf(fp, "\t\t\"e\": \"%s\"\n", mpz_get_str(NULL,16,b2b_e));
    fprintf(fp, "\t}\n,");
    fprintf(fp, "\t\"private\":{\n");
    fprintf(fp, "\t\t\"n\": \"%s\",\n", mpz_get_str(NULL,16,b2b_n));
    fprintf(fp, "\t\t\"d\": \"%s\"\n", mpz_get_str(NULL,16,b2b_d));
    fprintf(fp, "\t}\n");
    fprintf(fp, "}\n");
    fclose(fp);
    mpz_clear(b2b_n);
    mpz_clear(b2b_e);
    mpz_clear(b2b_d);
    mpz_clear(p);
    mpz_clear(q);
    mpz_clear(phi_mpz);
    mpz_clear(e_mpz);
}

char * generateKey(){
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
    n = getN(p,q),
    phi = getPHI(p,q);
    mpz_set_str(phi_mpz,phi,BASE);
    e = getE(phi_mpz);
    mpz_set_str(e_mpz,e,BASE);
    d = getD(e_mpz,phi_mpz);
    mpz_t b2b_n,
          b2b_e,
          b2b_d;
    mpz_init(b2b_n);
    mpz_init(b2b_e);
    mpz_init(b2b_d);
    mpz_set_str(b2b_n,n,BASE);
    mpz_set_str(b2b_e,e,BASE);
    mpz_set_str(b2b_d,d,BASE);
    char * tmp = calloc((strlen(n)+strlen(e)+strlen(d)) + 1, sizeof(char*));
    strcat(tmp,mpz_get_str(NULL,16,b2b_n));
    strcat(tmp,",");
    strcat(tmp,mpz_get_str(NULL,16,b2b_e));
    strcat(tmp,",");
    strcat(tmp,mpz_get_str(NULL,16,b2b_d));
    mpz_clear(b2b_n);
    mpz_clear(b2b_e);
    mpz_clear(b2b_d);
    return tmp;
}

char ** strToChar(char local_message[])
{
    char *message = calloc(300*BIT_COUNT*sizeof(char),sizeof(char*));
    strcpy(message, local_message);
    char ** array = calloc(300 * sizeof(char*),sizeof(char*));
    char* context = NULL;
    char* token = strtok_r(message, ",",&context);
    int num_tokens = 0, i = 0;
    while ((token != NULL) && num_tokens <300)
    {
        array[num_tokens] = token;
        num_tokens++;
        token = strtok_r(NULL, ",",&context);
    }
        return array;
}

char * encryption(char * message, char * n, char * e)
{
    char *res = calloc(300 * sizeof(unsigned long) + 1,sizeof(char*));
    char * tmp [600];
    mpz_t n_mpz,
          e_mpz,
          m_mpz,
          output;
    mpz_init(n_mpz);
    mpz_init(e_mpz);
    mpz_init(m_mpz);
    mpz_init(output);
    mpz_set_str(n_mpz,n,16);
    mpz_set_str(e_mpz,e,16);
    mpz_set_str(n_mpz,mpz_get_str(NULL,16,n_mpz),BASE);
    mpz_set_str(e_mpz,mpz_get_str(NULL,16,e_mpz),BASE);
    int i = 0 , k = 0;
    while (message[i] !='\0' && i < 600)
    {
        int ascii = (int)message[i];
        mpz_init_set_ui(m_mpz, ascii);
        mpz_powm(output,m_mpz,e_mpz,n_mpz);
        tmp[k] = mpz_get_str(NULL,16,output);
        tmp[k+1] = ",";
        i ++;
        k += 2;
    }
    mpz_clear(n_mpz);
    mpz_clear(e_mpz);
    mpz_clear(m_mpz);
    mpz_clear(output);
    int j = 0;
    while(j < k){
        strcat(res,tmp[j]);
        j++;
    }
    return res;
}

char * decryption(char * message, char * n, char * d)
{
    mpz_t n_mpz,
          d_mpz,
          m_mpz,
          output;
    char ** array = strToChar(message);
    char * tmp = calloc(300*sizeof(char),sizeof(char*));
    mpz_init(n_mpz);
    mpz_init(d_mpz);
    mpz_init(m_mpz);
    mpz_init(output);
    mpz_set_str(n_mpz,n,16);
    mpz_set_str(d_mpz,d,16);
    mpz_set_str(n_mpz,mpz_get_str(NULL,16,n_mpz),BASE);
    mpz_set_str(d_mpz,mpz_get_str(NULL,16,d_mpz),10);
    int i  = 0;
    while (array[i]!=NULL)
    {
        mpz_set_str(m_mpz,array[i],16);
        mpz_set_str(m_mpz,mpz_get_str(NULL,16,m_mpz),BASE);
        mpz_powm(output,m_mpz,d_mpz,n_mpz);
        tmp[i]= (int)mpz_get_ui(output);
        i++;
    }
    mpz_clear(n_mpz);
    mpz_clear(d_mpz);
    mpz_clear(m_mpz);
    char  res = atoi(mpz_get_str(NULL,10,output));
    mpz_clear(output);
    return tmp;
}

int main(int argc, char const *argv[])
{
    return 0;
}