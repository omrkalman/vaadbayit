import styles from './HomePage.module.css'
import Apartment from '../Apartment/Apartment'
import Balance from '../Balance/Balance'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format, startOfMonth } from 'date-fns'

function HomePage() {

    return (
        <>
            <section className={[styles.feature, styles.slider, 'my-card'].join(' ')}>
                <div className={styles.title}>
                    <h1>Easily Manage Neighboors or Tenants</h1>
                    <ul className={styles.bulletPoints}>
                        <li>Including name, address, and payments made.</li>
                    </ul>
                </div>
                <div className={styles.apartments}>
                    <Apartment isDisplayOnly={true} apartment={{ nickname: 'John Doe', number: 21 }} />
                    <Apartment isDisplayOnly={true} apartment={{ nickname: 'The Smiths', number: 22 }} />
                </div>
            </section>
            <section className={[styles.feature, styles.slider, 'my-card'].join(' ')}>
                <div className={styles.flowExample}>
                    <div className={styles.balanceContainer}>
                        <h5>B A L A N C E</h5>
                        <Balance isDisplayOnly={true} />
                    </div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={[
                            {
                                title: 'Cleaning',
                                date: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                                backgroundColor: 'red',
                                borderColor: 'red'
                            },
                            {
                                title: 'Rent',
                                date: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
                                backgroundColor: 'green',
                                borderColor: 'green'
                            },
                        ]}
                    />
                </div>
                <div className={styles.title}>
                    <h1>Keep Track of Expenditures and Payments</h1>
                    <ul className={styles.bulletPoints}>
                        <li>Never struggle with bookkeeping again</li>
                        
                        <li>Create your custom "reasons"</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default HomePage