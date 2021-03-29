import vacation from '../assets/request/vacation.png'
import sick from '../assets/request/sick.png'
import ownExpense from '../assets/request/ownExpense.png'

export const imgController = (reqType) => {
    switch (reqType) {
        case "Vacation":
            return vacation;
        case "Sick":
            return sick;
        case "Own expense":
            return ownExpense;
    }
}

