import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { ChannelsData, TableData, agencies, agentlistdata, attachementsData, bookmarkData, browserData, callsData, chatContactData, chatData, cources, courseGrid, courseList, customerList, dealData, earningcard, earningdata, estateList, feedback, instructor, invoice, invoicesList, leadData, listingGrid, listinglist, listinglistcard, messages, orderList, orders, productList, products, property, recentcourse, rentproperty, saleproperty, sales, sellerList, sellerOverview, subscription, supporttickets, taskData, ticketList, topPageData } from '../data';
import { category, instructorGrid, instructorList } from '../data/learning';


@Injectable()
export class fakebackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // tslint:disable-next-line: max-line-length
        const users: any[] = JSON.parse(localStorage.getItem('users')!) || [{ username: 'admin', email: 'admin@themesbrand.com', password: '123456' }];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const filteredUsers = users.filter(user => {
                    return user.email === request.body.email && user.password === request.body.password;
                });
                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get user by id
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    // tslint:disable-next-line: radix
                    const id = parseInt(urlParts[urlParts.length - 1]);
                    // tslint:disable-next-line: no-shadowed-variable
                    const matchedUsers = users.filter(user => user.id === id);
                    const user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;

                // validation
                const duplicateUser = users.filter(user => user.username === newUser.username).length;
                if (duplicateUser) {
                    return throwError({ error: { message: 'Username "' + newUser.username + '" is already taken' } });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // tslint:disable-next-line: max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    // tslint:disable-next-line: radix
                    const id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get browser
            if (request.url.endsWith('/app/browser') && request.method === 'GET') {
                if (browserData) {
                    return of(new HttpResponse({ status: 200, body: browserData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get toppage
            if (request.url.endsWith('/app/toppage') && request.method === 'GET') {
                if (topPageData) {
                    return of(new HttpResponse({ status: 200, body: topPageData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get table
            if (request.url.endsWith('/app/table') && request.method === 'GET') {
                if (TableData) {
                    return of(new HttpResponse({ status: 200, body: TableData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get lead
            if (request.url.endsWith('/app/lead') && request.method === 'GET') {
                if (leadData) {
                    return of(new HttpResponse({ status: 200, body: leadData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get deal
            if (request.url.endsWith('/app/deal') && request.method === 'GET') {
                if (dealData) {
                    return of(new HttpResponse({ status: 200, body: dealData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get tasks
            if (request.url.endsWith('/app/tasks') && request.method === 'GET') {
                if (taskData) {
                    return of(new HttpResponse({ status: 200, body: taskData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get sales
            if (request.url.endsWith('/app/sales') && request.method === 'GET') {
                if (sales) {
                    return of(new HttpResponse({ status: 200, body: sales }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get order
            if (request.url.endsWith('/app/order') && request.method === 'GET') {
                if (orders) {
                    return of(new HttpResponse({ status: 200, body: orders }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get products
            if (request.url.endsWith('/app/products') && request.method === 'GET') {
                if (products) {
                    return of(new HttpResponse({ status: 200, body: products }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get instructor
            if (request.url.endsWith('/app/instructor') && request.method === 'GET') {
                if (instructor) {
                    return of(new HttpResponse({ status: 200, body: instructor }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get instructor
            if (request.url.endsWith('/app/instructorlist') && request.method === 'GET') {
                if (instructorList) {
                    return of(new HttpResponse({ status: 200, body: instructorList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            if (request.url.endsWith('/app/instructorlist') && request.method === 'POST') {
                const newUser = request.body;
                if (instructorList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update listingGrid
            if (request.url.endsWith('/app/instructorlist') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (instructorList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE listingGrid
            if (request.url.endsWith('/app/instructorlist') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (instructorList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get instructor
            if (request.url.endsWith('/app/instructorGrid') && request.method === 'GET') {
                if (instructorGrid) {
                    return of(new HttpResponse({ status: 200, body: instructorGrid }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            if (request.url.endsWith('/app/instructorGrid') && request.method === 'POST') {
                const newUser = request.body;
                if (instructorGrid) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update listingGrid
            if (request.url.endsWith('/app/instructorGrid') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (instructorGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE listingGrid
            if (request.url.endsWith('/app/instructorGrid') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (instructorGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get recentcourse
            if (request.url.endsWith('/app/recentcourse') && request.method === 'GET') {
                if (recentcourse) {
                    return of(new HttpResponse({ status: 200, body: recentcourse }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get recentcourse
            if (request.url.endsWith('/app/property') && request.method === 'GET') {
                if (property) {
                    return of(new HttpResponse({ status: 200, body: property }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get recentcourse
            if (request.url.endsWith('/app/feedback') && request.method === 'GET') {
                if (feedback) {
                    return of(new HttpResponse({ status: 200, body: feedback }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get recentcourse
            if (request.url.endsWith('/app/saleproperty') && request.method === 'GET') {
                if (saleproperty) {
                    return of(new HttpResponse({ status: 200, body: saleproperty }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get recentcourse
            if (request.url.endsWith('/app/rentproperty') && request.method === 'GET') {
                if (rentproperty) {
                    return of(new HttpResponse({ status: 200, body: rentproperty }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get listingGrid
            if (request.url.endsWith('/app/listingGrid') && request.method === 'GET') {
                if (listingGrid) {
                    return of(new HttpResponse({ status: 200, body: listingGrid }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add listingGrid
            if (request.url.endsWith('/app/listingGrid') && request.method === 'POST') {
                const newUser = request.body;
                if (listingGrid) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update listingGrid
            if (request.url.endsWith('/app/listingGrid') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (listingGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE listingGrid
            if (request.url.endsWith('/app/listingGrid') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (listingGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // add listingList
            if (request.url.endsWith('/app/listingList') && request.method === 'GET') {
                if (listinglist) {
                    return of(new HttpResponse({ status: 200, body: listinglist }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get agentlist
            if (request.url.endsWith('/app/agent') && request.method === 'GET') {
                if (agentlistdata) {
                    return of(new HttpResponse({ status: 200, body: agentlistdata }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Add agentlist
            if (request.url.endsWith('/app/agent') && request.method === 'POST') {
                const newUser = request.body;
                if (agentlistdata) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update agentlist
            if (request.url.endsWith('/app/agent') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (agentlistdata) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE agentlist
            if (request.url.endsWith('/app/agent') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (agentlistdata) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get agencylist
            if (request.url.endsWith('/app/agencies') && request.method === 'GET') {
                if (agencies) {
                    return of(new HttpResponse({ status: 200, body: agencies }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add agencylist
            if (request.url.endsWith('/app/agencies') && request.method === 'POST') {
                const newUser = request.body;
                if (agencies) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update agencylist
            if (request.url.endsWith('/app/agencies') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (agencies) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE agencylist
            if (request.url.endsWith('/app/agencies') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (agencies) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get support tickets
            if (request.url.endsWith('/app/supporttickets') && request.method === 'GET') {
                if (supporttickets) {
                    return of(new HttpResponse({ status: 200, body: supporttickets }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get support tickets list
            if (request.url.endsWith('/app/ticketList') && request.method === 'GET') {
                if (ticketList) {
                    return of(new HttpResponse({ status: 200, body: ticketList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add agencylist
            if (request.url.endsWith('/app/ticketList') && request.method === 'POST') {
                const newUser = request.body;
                if (ticketList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update agencylist
            if (request.url.endsWith('/app/ticketList') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (ticketList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE agencylist
            if (request.url.endsWith('/app/ticketList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (ticketList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get chatmessage list
            if (request.url.endsWith('/app/message') && request.method === 'GET') {
                if (messages) {
                    return of(new HttpResponse({ status: 200, body: messages }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get chatmessage list
            if (request.url.endsWith('/app/chatData') && request.method === 'GET') {
                if (chatData) {
                    return of(new HttpResponse({ status: 200, body: chatData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get chatmessage list
            if (request.url.endsWith('/app/channnellist') && request.method === 'GET') {
                if (ChannelsData) {
                    return of(new HttpResponse({ status: 200, body: ChannelsData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get contact list
            if (request.url.endsWith('/app/chatContactData') && request.method === 'GET') {
                if (chatContactData) {
                    return of(new HttpResponse({ status: 200, body: chatContactData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

             // get contact list
             if (request.url.endsWith('/app/attachementsData') && request.method === 'GET') {
                if (attachementsData) {
                    return of(new HttpResponse({ status: 200, body: attachementsData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get contact list
            if (request.url.endsWith('/app/callsData') && request.method === 'GET') {
                if (callsData) {
                    return of(new HttpResponse({ status: 200, body: callsData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

             // get contact list
             if (request.url.endsWith('/app/bookmarkData') && request.method === 'GET') {
                if (bookmarkData) {
                    return of(new HttpResponse({ status: 200, body: bookmarkData }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get product list
            if (request.url.endsWith('/app/productList') && request.method === 'GET') {
                if (productList) {
                    return of(new HttpResponse({ status: 200, body: productList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add product list
            if (request.url.endsWith('/app/productList') && request.method === 'POST') {
                const newUser = request.body;
                if (productList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update product list
            if (request.url.endsWith('/app/productList') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (productList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE product list
            if (request.url.endsWith('/app/productList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (productList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get customerList list
            if (request.url.endsWith('/app/customerList') && request.method === 'GET') {
                if (customerList) {
                    return of(new HttpResponse({ status: 200, body: customerList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add product list
            if (request.url.endsWith('/app/customerList') && request.method === 'POST') {
                const newUser = request.body;
                if (customerList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update product list
            if (request.url.endsWith('/app/customerList') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (customerList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE product list
            if (request.url.endsWith('/app/customerList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (customerList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            // get Invoice list
            if (request.url.endsWith('/app/invoiceList') && request.method === 'GET') {
                if (invoicesList) {
                    return of(new HttpResponse({ status: 200, body: invoicesList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get Invoice
            if (request.url.endsWith('/app/invoice') && request.method === 'GET') {
                if (invoice) {
                    return of(new HttpResponse({ status: 200, body: invoice }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // DELETE seller list
            if (request.url.endsWith('/app/invoiceList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (invoicesList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get Seller
            if (request.url.endsWith('/app/sellerOverview') && request.method === 'GET') {
                if (sellerOverview) {
                    return of(new HttpResponse({ status: 200, body: sellerOverview }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add seller list
            if (request.url.endsWith('/app/sellerOverview') && request.method === 'POST') {
                const newUser = request.body;
                if (sellerOverview) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update seller list
            if (request.url.endsWith('/app/sellerOverview') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (sellerOverview) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE seller list
            if (request.url.endsWith('/app/sellerOverview') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (sellerOverview) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get Seller
            if (request.url.endsWith('/app/seller') && request.method === 'GET') {
                if (sellerList) {
                    return of(new HttpResponse({ status: 200, body: sellerList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add seller list
            if (request.url.endsWith('/app/seller') && request.method === 'POST') {
                const newUser = request.body;
                if (sellerList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update seller list
            if (request.url.endsWith('/app/seller') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (sellerList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE seller list
            if (request.url.endsWith('/app/seller') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (sellerList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get orderList
            if (request.url.endsWith('/app/orderList') && request.method === 'GET') {
                if (orderList) {
                    return of(new HttpResponse({ status: 200, body: orderList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add orderList list
            if (request.url.endsWith('/app/orderList') && request.method === 'POST') {
                const newUser = request.body;
                if (orderList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update orderList list
            if (request.url.endsWith('/app/orderList') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (orderList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE orderList list
            if (request.url.endsWith('/app/orderList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (orderList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get category
            if (request.url.endsWith('/app/category') && request.method === 'GET') {
                if (category) {
                    return of(new HttpResponse({ status: 200, body: category }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add category list
            if (request.url.endsWith('/app/category') && request.method === 'POST') {
                const newUser = request.body;
                if (category) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get realestate listing grid
            if (request.url.endsWith('/app/listinglistcard') && request.method === 'GET') {
                if (listinglistcard) {
                    return of(new HttpResponse({ status: 200, body: listinglistcard }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get realestate listing grid
            if (request.url.endsWith('/app/estateList') && request.method === 'GET') {
                if (estateList) {
                    return of(new HttpResponse({ status: 200, body: estateList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get earning data
            if (request.url.endsWith('/app/earningdata') && request.method === 'GET') {
                if (earningdata) {
                    return of(new HttpResponse({ status: 200, body: earningdata }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // get earning card
            if (request.url.endsWith('/app/earningcard') && request.method === 'GET') {
                if (earningcard) {
                    return of(new HttpResponse({ status: 200, body: earningcard }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get subscriptions
            if (request.url.endsWith('/app/subscription') && request.method === 'GET') {
                if (subscription) {
                    return of(new HttpResponse({ status: 200, body: subscription }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get subscriptions
            if (request.url.endsWith('/app/cources') && request.method === 'GET') {
                if (cources) {
                    return of(new HttpResponse({ status: 200, body: cources }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // get coureslist
            if (request.url.endsWith('/app/courseList') && request.method === 'GET') {
                if (courseList) {
                    return of(new HttpResponse({ status: 200, body: courseList }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add courseList list
            if (request.url.endsWith('/app/courseList') && request.method === 'POST') {
                const newUser = request.body;
                if (courseList) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update courseList list
            if (request.url.endsWith('/app/courseList') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (courseList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE courseList list
            if (request.url.endsWith('/app/courseList') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (courseList) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            // get coureslist
            if (request.url.endsWith('/app/courseGrid') && request.method === 'GET') {
                if (courseGrid) {
                    return of(new HttpResponse({ status: 200, body: courseGrid }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }
            // Add courseList list
            if (request.url.endsWith('/app/courseGrid') && request.method === 'POST') {
                const newUser = request.body;
                if (courseGrid) {
                    return of(new HttpResponse({ status: 200, body: newUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // Update courseList list
            if (request.url.endsWith('/app/courseGrid') && request.method === 'PUT') {
                const updatedUser = request.body;
                if (courseGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser }));
                } else {
                    return throwError({ status: 401, error: { message: 'No Data Found' } });
                }
            }

            // DELETE courseList list
            if (request.url.endsWith('/app/courseGrid') && request.method === 'DELETE') {
                const updatedUser = request.body;
                if (courseGrid) {
                    return of(new HttpResponse({ status: 200, body: updatedUser })); // respond 200 OK
                } else {
                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }
            return next.handle(request);

        }))

            // tslint:disable-next-line: max-line-length
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}
