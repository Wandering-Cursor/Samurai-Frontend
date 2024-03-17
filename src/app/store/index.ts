import { ActionReducerMap } from "@ngrx/store";
import { AnalyticsReducer, AnalyticsState } from "./Analytics/analytics.reducer";
import { CRMReducer, CRMState } from "./CRM/crm.reducer";
import { ECoReducer, ECoState } from "./Ecommerce/ecommerce.reducer";
import { LearningReducer, LearningState } from "./Learning/learning.reducer";
import { RealReducer, RealState } from "./RealEstate/realEstate.reducer";
import { AppRealestateReducer, AppRealestateState } from "./App-realestate/apprealestate.reducer";
import { AgentReducer, AgentState } from "./Agent/agent.reducer";
import { AgenciesReducer, AgenciesState } from "./Agency/agency.reducer";
import { TicketReducer, TicketState } from "./Tickets/ticket.reducer";
import { ChatReducer, ChatState } from "./chat/chat.reducer";
import { ProductReducer, ProductState } from "./Product/product.reducer";
import { InvoiceReducer, InvoiceState } from "./Invoices/invoices.reducer";
import { AuthenticationState, authenticationReducer } from "./Authentication/authentication.reducer";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { SelleReducer, SellerState } from "./Seller/seller.reducer";
import { OrderReducer, OrderState } from "./Orders/order.reducer";
import { InstructorReducer, InstructorState } from "./Learning-instructor/instructor.reducer";
import { CustomerReducer, CustomerState } from "./Customer/customer.reducer";
import { StudentsReducer, studentState } from "./students/student.reducer";
import { CourcesReducer, CourcesState } from "./Learning-cources/cources.reducer";


export interface RootReducerState {
    layout: LayoutState,
    auth: AuthenticationState;
    statlist: AnalyticsState;
    CRMlist: CRMState;
    Ecommercelist: ECoState;
    Learninglist: LearningState;
    Realist: RealState;
    Apprealestate: AppRealestateState;
    Agentlist: AgentState;
    Agenciesdata: AgenciesState;
    ticketlist: TicketState;
    Chatmessage: ChatState;
    product: ProductState;
    Invoice: InvoiceState;
    Sellerlist: SellerState;
    Orderlist: OrderState;
    LearningList: InstructorState;
    CustomerList: CustomerState;
    SubscriptionList: studentState;
    CourcesList: CourcesState;
    Instructorlist: InstructorState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    layout: layoutReducer,
    statlist: AnalyticsReducer,
    CRMlist: CRMReducer,
    auth: authenticationReducer,
    Ecommercelist: ECoReducer,
    Learninglist: LearningReducer,
    Realist: RealReducer,
    Apprealestate: AppRealestateReducer,
    Agentlist: AgentReducer,
    Agenciesdata: AgenciesReducer,
    ticketlist: TicketReducer,
    Chatmessage: ChatReducer,
    product: ProductReducer,
    Invoice: InvoiceReducer,
    Sellerlist: SelleReducer,
    Orderlist: OrderReducer,
    LearningList: InstructorReducer,
    CustomerList: CustomerReducer,
    SubscriptionList: StudentsReducer,
    CourcesList: CourcesReducer,
    Instructorlist: InstructorReducer
}