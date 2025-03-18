'use client';

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput';
import { authFormSchema } from '../../lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '../../lib/actions/user.actions';

const AuthForm = ({ type }: { type: string }) => {  

  const router = useRouter();
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);


  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",  
      firstName:"",
      lastName:"",
      adresse1:"",
      ville:"",
      pays:"",
      codePostal:"",
      dateDeNaissance:"",
      nss:"",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      console.log(data);

      if (type === 'sign-up') {
         const newUser = await signUp(data);
         setUser(newUser);
      }

      if (type === 'sign-in') {
        const response = await signIn({
           email: data.email,
           password: data.password,
         });

         if (response) router.push('/');
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/bluelogo.jpg"
            width={40}
            height={40}
            alt="ECO logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">ECO</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? 'Accéder à votre compte' : type === 'sign-in' ? 'Connexion' : 'Inscription'}
          </h1>

          <p className="text-16 font-normal text-gray-600">
            {user ? 'Créez votre compte et commencez' : 'Veuillez rentrer vos informations'}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* Ajoutez ici des fonctionnalités supplémentaires si nécessaire */}
        </div>
      ) : (
        <Form {...form}>   
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                  <CustomInput 
                    control={form.control} 
                    name="firstName" 
                    label="Prénom"
                    placeholder="Entrez votre prénom" 
                  />
                  <CustomInput 
                    control={form.control} 
                    name="lastName" 
                    label="Nom"
                    placeholder="Entrez votre nom" 
                  />
                </div>
                <CustomInput 
                  control={form.control} 
                  name="adresse1" 
                  label="Adresse"
                  placeholder="Entrez votre adresse" 
                />
                <CustomInput 
                  control={form.control} 
                  name="ville" 
                  label="Ville"
                  placeholder="Entrez votre ville" 
                />
                <div className="flex gap-4">
                  <CustomInput 
                    control={form.control} 
                    name="pays" 
                    label="Pays"
                    placeholder="Exemple: Sénégal" 
                  />
                  <CustomInput 
                    control={form.control} 
                    name="codePostal" 
                    label="Code Postal"
                    placeholder="Exemple: 11101" 
                  />
                </div>

                <div className="flex gap-4">
                  <CustomInput 
                    control={form.control} 
                    name="dateDeNaissance" 
                    label="Date de naissance"
                    placeholder="YYYY-MM-DD" 
                  />
                  <CustomInput 
                    control={form.control} 
                    name="nss" 
                    label="NSS"
                    placeholder="Exemple: 1234" 
                  />
                </div>
              </>
            )}
            
            <CustomInput 
              control={form.control} 
              name="email" 
              label="Email"
              placeholder="Entrez votre email" 
            />

            <CustomInput 
              control={form.control} 
              name="password" 
              label="Mot de passe"
              placeholder="Entrez votre mot de passe" 
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className="form-btn"> 
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin"/> &nbsp;
                    Chargement...
                  </>
                ) : type === 'sign-in' ? 'Se connecter' : 'S’inscrire'}
              </Button>
            </div>
          </form>
        </Form>
      )}
      
      <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === 'sign-in' ? "Vous n'avez pas de compte?" : "Vous avez déjà un compte?"}
        </p>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
          {type === 'sign-in' ? 'S’inscrire' : 'Se connecter'}
        </Link>
      </footer>
    </section>
  );
}

export default AuthForm;
