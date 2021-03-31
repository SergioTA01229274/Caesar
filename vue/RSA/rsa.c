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
    strcat(tmp,",");
    mpz_clear(b2b_n);
    mpz_clear(b2b_e);
    mpz_clear(b2b_d);
    return tmp;
}

char ** strToChar(char local_message[])
{
    char *message = malloc(300*BIT_COUNT*sizeof(char));
    strcpy(message, local_message);
    char ** array = malloc(300 * sizeof(char*));
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
    char *res = malloc(300 * sizeof(unsigned long) + 1);
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
        tmp[k] = mpz_get_str(NULL,BASE,output);
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
    char * tmp = malloc(300*sizeof(char));
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
    //printf("%s\n", generateKey());
    char * n = "b12d86917de5a5e6c8d342cdbca679612a52468c5320717dc45e8f4eed80fe5b9deca11e1bf41eb00cb7cd275e124f661199db2967d8065471ede61ba0389f8191afda756ffddd0ce0e685252b1cb6ffd729d4e29674ffa18f88e938f6477b6de99aadb22ea530d8cfbc930336c5d916d83fcbb7bbd5a1d67c23a3963bfe1aea2c918b43070720c5443096241a631898917b7b34030c27372d0424ee3a1ddb00a0f7fc4b475cbbbd173c9d0fb94cbacaa531ce37f0c66624cb7ceead8553e2938760198550ce002f058de7f3a0cb6af4cf8ea849a9e1843d7dca398327fe0aa7addbc8fe7a14605f21a624606b657c4393903fd27b903e0c4061de2bcfae97bb";
    char * e = "70b190d0cfc67567382ccf9055100093b9116decc1f098b22a365d42dd4cf800d3f4576ddd4a1095abec36cecfcef8829a02133e6b2bb2a82ad003761f76670701ab09df23d9fdd9762e8a08cf59679d0ea2e9bc80e81778dc025ab7619ed4fc27cfb8d84e730d898c29d391fcf44c60a16d7c20ae32fe8ad9eb0e87a45a6db305e81308284620abcfdc3a4c1c932fba8b25b4fa2206402ce0b4d07f2fa16b1ec74ecdc3c0b5679d4e3a0733688f16a04a84b9d11a4415b6d335de743311fd674afa17844db031d625b149c2aa52699eaea13b2c279fbeb4391791c5796bda9f59a28954af9224c6b1739bbb1152ee4adb4148da1684ac30821081b8c809cb39";
    char * d = "12e2bf5a43e3cc6a72a6f4f97179c83ec9ce0f698b6920c860a02e4fc80cf47fb2a61966696814d7f84c2206f20b1d715e684150a68af1f82cf06f228c4d63e6dae1bd0eeb07671f713e4b0b6886c216cee390a9e0ee1bbbc734119773d8c32e89bbeb7c321cc57e43da3ae77737afdda903d7f9fa3c67e9014cbd132be67a164f5015d79d73462ffac6cfa5a3cd58c68e1eb46c8629c0c1653e4b9b296e685fe300a0c4eaf92ff99579afb22cbafc59af4c75cabb3ab3db5c4694a6f5629cb58e5563c92c8000feeed8686aca54335d4a6aa1698486407f456e0fb67d79f84defb1da18cc556ae7cf6bf4963e2ecb78fe819e5edc0ad272e91be87dce5d60a9";
    char * string1 = "i2";
    char * string2 = encryption(string1,n,e);
    printf("%s\n",decryption(string2,n,d));
    return 0;
}