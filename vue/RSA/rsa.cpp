#include <gmp.h>
#include <stdlib.h>

using namespace std;

void findD(mpz_t phi, mpz_t e, mpz_t k) {
	mpz_sub_ui(k, phi, 1);
	mpz_t aux, aux2, aux3;		
	mpz_init(aux);
	mpz_init(aux2);
	mpz_init(aux3);
	while ( mpz_cmp_ui(k, 0) != 0 )
	{
		mpz_set_ui(aux, 1);
		mpz_mul(aux2, k, phi);
		mpz_add(aux3, aux, aux2);
		mpz_cdiv_q(aux, aux3, e);
		mpz_fdiv_q(aux2, aux3, e);
		if ( mpz_cmp(aux, aux2) == 0 )
		{
			mpz_set(k, aux);
			break;
		}
		mpz_sub_ui(k, k, 1);
	}
	mpz_clear(aux);
	mpz_clear(aux2);
	mpz_clear(aux3);			
}

int main(int argc, char *argv[]) {
   
	mpz_t p,q,n,d,phi,e,message,o1,o2;

	mpz_init(n);
	mpz_init(phi);
	mpz_init(o1);
	mpz_init(o2);

	mpz_init_set_ui(p, 153313);
	mpz_init_set_ui(q, 380461);

	mpz_mul(n, p, q);

	mpz_set(o1, p);
	mpz_set(o2, q);

	mpz_sub_ui(o1, o1, 1);
	mpz_sub_ui(o2, o2, 1);

	mpz_mul(phi, o1, o2);

	mpz_init_set_ui(e, 65537);

	mpz_init_set_ui(message, atoi(argv[1]));

	mpz_init(d);
	findD(phi, e, d);

	gmp_printf ("p=%Zd\n", p);
	gmp_printf ("q=%Zd\n", q);
	gmp_printf ("n=%Zd\n", n);
	gmp_printf ("phi=%Zd\n", phi);
	gmp_printf ("e=%Zd\n", e);
	gmp_printf ("d=%Zd\n", d);

	mpz_powm(o1, message, e, n);
	gmp_printf ("\nMESSAGE=%Zd\n", message);
	gmp_printf ("cifer=%Zd\n", o1);

	mpz_powm(o2, o1, d, n);
	gmp_printf ("decifer=%Zd\n", o2);

	mpz_clear(p);
	mpz_clear(q);
	mpz_clear(n);
	mpz_clear(d);
	mpz_clear(phi);
	mpz_clear(o1);
	mpz_clear(o2);
	mpz_clear(e);
	mpz_clear(message);

	
    return 0;
}