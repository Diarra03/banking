import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'
import { getLoggedInUser } from '../../../lib/actions/user.actions';

const Home = async () => {
    const loggedIn = await  getLoggedInUser();
    return(
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox 
                    type="greeting"
                    title="Bienvenue"
                    user= {loggedIn?.name || 'Guest'}
                    subtext= "Accéder et gérer votre propre compte et vos transactions éfficacement "
                    />

                    <TotalBalanceBox 
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250000}
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