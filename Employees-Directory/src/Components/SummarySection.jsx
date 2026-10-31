import React from 'react'
import "./SummarySection.css"

const SummarySection = () => {

    const summaryData = [
        {id:1,title:"Total Employees",logo:"fa-solid fa-user",count:48 ,colour:"5px solid #0d6b24"},
        {id:2,title:"IT Department",logo:"fa-solid fa-code",count:20, colour:"5px solid #2e65cc"},
        {id:3,title:"HR Department",logo:"fa-solid fa-users",count:8 ,colour:"	5px solid #d1380a"},
        {id:4,title:"Sales Department",logo:"fa-solid fa-chart-line",count:14 ,colour:"5px solid #0d6b24"},
    ]
    return (
    <div>
        <section className='summary-section'>
            {
                summaryData.map((item)=>(
                    <div className='summary-card' key={item.id} style={{ borderLeft:item.colour }}>
                        <h3>{item.title}</h3>
                        <p><i className={item.logo}></i> {item.count}</p>
                    </div>
                ))
            }
        </section>
    </div>
  )
}

export default SummarySection
