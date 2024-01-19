// JavaScript source code

import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest"
import TicketService from "../src/pairtest/TicketService"

Run()
{
    if (#SuccessfulTest() && #NoAdultTest() && #TooManyTicketsTest() && #BadAccountIdTest()) {
        alert("Success");
    }

    alert("whoops");

}

#SuccessfulTest()
{
    var adultTickets = new TicketTypeRequest("ADULT", 5);
    var childTickets = new TicketTypeRequest("CHILD", 5);
    var infantTickets = new TicketTypeRequest("INFANT", 5);
    var ticketRequests = new TicketTypeRequest() { adultTickets, childTickets, infantTickets };

    try
    {
        var ticketService = new TicketService();
        var outCome = ticketService.purchaseTickets(1, ticketRequests);
    }
    catch
    {
        return false;
    }

    if (outCome.Cost == 30 && outCome.Seats == 10) return true;
    return false;
}

#NoAdultTest()
{
    var adultTickets = new TicketTypeRequest("ADULT", 0);
    var childTickets = new TicketTypeRequest("CHILD", 5);
    var infantTickets = new TicketTypeRequest("INFANT", 5);
    var ticketRequests = new TicketTypeRequest() { adultTickets, childTickets, infantTickets };

    try {
        var ticketService = new TicketService();
        ticketService.purchaseTickets(1, ticketRequests);
    }
    catch (err) {
        if (err.Message = "No Adult Ticket") { return true; }
    }

    return false;
}

#TooManyTicketsTest()
{
    var adultTickets = new TicketTypeRequest("ADULT", 11);
    var childTickets = new TicketTypeRequest("CHILD", 5);
    var infantTickets = new TicketTypeRequest("INFANT", 5);
    var ticketRequests = new TicketTypeRequest() { adultTickets, childTickets, infantTickets };

    try {
        var ticketService = new TicketService();
        ticketService.purchaseTickets(1, ticketRequests);
    }
    catch (err) {
        if (err.Message = "Too Many Tickets") { return true; }
    }

    return false;
}

#BadAccountIdTest()
{
    var adultTickets = new TicketTypeRequest("ADULT", 5);
    var childTickets = new TicketTypeRequest("CHILD", 5);
    var infantTickets = new TicketTypeRequest("INFANT", 5);
    var ticketRequests = new TicketTypeRequest() { adultTickets, childTickets, infantTickets };

    try {
        var ticketService = new TicketService();
        ticketService.purchaseTickets(0, ticketRequests);
    }
    catch (err) {
        if (err.Message = "Bad Account ID") { return true; }
    }

    return false;
}

