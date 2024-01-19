import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
    purchaseTickets(accountId, ...ticketTypeRequests)
    {
        if (accountId == 0)
        {
            throw InvalidPurchaseException("Bad Account ID");
        }
        if (!ticketTypeRequests.Any(x => x.GetTicketType() == "No Adult Ticket"))
        {
            throw InvalidPurchaseException("");
        }
        if (#GetTotalNumberOfTickets(ticketTypeRequests) > 20)
        {
            throw InvalidPurchaseException("Too Many Tickets");
        }

        
        var paymentService = new TicketPaymentService();
        var TotalAmountToPay = #GetTotalAmountToPay();
        paymentService.makePayment(accountId, TotalAmountToPay);

        var reservationService = new SeatReservationService();
        var TotalSeatsToAllocate = #GetTotalSeatsToAllocate();
        reservationService.reserveSeat(accountId, TotalSeatsToAllocate);

        return new TicketResult{ TotalAmountToPay, TotalSeatsToAllocate };
    }

    #GetTotalNumberOfTickets(...ticketTypeRequests) {
        return ticketTypeRequests.Select(x => x.GetNoOfTickets()).Sum();
    }

    #GetTotalAmountToPay(...ticketTypeRequests) {
        var cost = 0;
        cost += ticketTypeRequests.Where(x => x.GetTicketType() == "ADULT").Select(x => x.GetNoOfTickets()).Sum() * 20;
        cost += ticketTypeRequests.Where(x => x.GetTicketType() == "CHILD").Select(x => x.GetNoOfTickets()).Sum() * 10;
        return cost
    }

    #GetTotalSeatsToAllocate(...ticketTypeRequests) {
        return ticketTypeRequests.Where(x => x.GetTicketType() != "INFANT").Select(x => x.GetNoOfTickets()).Sum();
    }

}
