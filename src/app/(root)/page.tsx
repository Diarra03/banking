import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
    const loggedIn = {firstName: 'Mame Diarra', lastName:'Ndiaye', email:'mdiarrandiaye2003@gmail.com'};
    return(
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox 
                    type="greeting"
                    title="Bienvenue"
                    user= {loggedIn?.firstName || 'Guest'}
                    subtext= "Accéder et gérer votre propre compte et vos transactions éfficacement "
                    />

                    <TotalBalanceBox 
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250.35}
                    />

                </header>

                TRANSACTIONS RECENTES

            </div>

            <RightSideBar 
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance: 10000}, {}]}
            />
        </section>
    )
}

export default Home