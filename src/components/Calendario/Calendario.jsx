import React, { useState, useEffect } from 'react'
import "./Style.css"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"

function MeuCalendario({ onDateClick }) {
  const [currYear, setCurrYear] = useState(new Date().getFullYear())
  const [currMonth, setCurrMonth] = useState(new Date().getMonth())
  const [date, setDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    // Definir a data atual como a data selecionada quando o componente for montado
    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
    setSelectedDate(today)
    onDateClick(formattedDate)
  }, []) // [] significa que este efeito ocorrerá apenas uma vez, quando o componente for montado

  useEffect(() => {
    renderCalendar()
  }, [currYear, currMonth]) // re-render when year or month changes

  const renderCalendar = () => {
    const daysTag = document.querySelector(".days")
    const currentDate = document.querySelector(".current-date")
  
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay()
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay()
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate()
    let liTags = []
  
    for (let i = firstDayofMonth; i > 0; i--) {
      const li = document.createElement('li')
      li.className = 'inactive'
      li.appendChild(document.createTextNode(lastDateofLastMonth - i + 1))
      liTags.push(li)
    }
  
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : ""
      const li = document.createElement('li')
      li.className = isToday
      li.appendChild(document.createTextNode(i))
      li.addEventListener('click', () => handleDateClick(i, li))
      liTags.push(li)
    }
  
    for (let i = lastDayofMonth; i < 6; i++) {
      const li = document.createElement('li')
      li.className = 'inactive'
      li.appendChild(document.createTextNode(i - lastDayofMonth + 1))
      liTags.push(li)
    }
  
    // Limpa o conteúdo atual antes de adicionar os novos elementos
    daysTag.innerHTML = ""
    
    // Adiciona os elementos do array diretamente ao DOM
    liTags.forEach(li => {
      daysTag.appendChild(li)
    })
  
    currentDate.innerText = `${months[currMonth]} ${currYear}`
  }
  
  const prevNextClick = (isPrev) => {
    if (isPrev) {
      setCurrMonth(currMonth - 1)
    } else {
      setCurrMonth(currMonth + 1)
    }
  }

  const handleDateClick = (day, liElement) => {
    const clickedDate = new Date(currYear, currMonth, day)
    const formattedDate = clickedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
    setSelectedDate(clickedDate)

    // Remover classe 'active' de todos os elementos
    const allLiElements = document.querySelectorAll('.days li')
    allLiElements.forEach(li => li.classList.remove('active'))

    // Adicionar classe 'active' apenas ao elemento clicado
    liElement.classList.add('active')
    onDateClick(formattedDate)
  }

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

 
  return (
    <div className="wrapper">
      <header>
        <div className="icons">
          <span
            id="prev"
            className="material-symbols-rounded"
            onClick={() => prevNextClick(true)}
          >
            <FaChevronLeft className='chevron' />
          </span>
          <p className="current-date"></p>
          <span
            id="next"
            className="material-symbols-rounded"
            onClick={() => prevNextClick(false)}
          >
           <FaChevronRight className='chevron'  />
          </span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>D</li>
          <li>S</li>
          <li>T</li>
          <li>Q</li>
          <li>Q</li>
          <li>S</li>
          <li>S</li>
        </ul>
        <ul className="days"></ul>
      </div>
    </div>
  )
}

export default MeuCalendario
