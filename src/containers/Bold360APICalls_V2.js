import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Alert from 'react-s-alert';
import Dashboard from '../components/Dashboard';

const AccountID = '730051643012624573';
const APISettingID = '724965503154793101';
const APIkey = 'ksmFyl0moH+abXebuKMjHtNjFuSBCeyA';

const corsAPIHost = 'cors-anywhere.herokuapp.com';
const corsAPIUrl = `https://${corsAPIHost}/`;
const url = `${corsAPIUrl}https://api.boldchat.com/aid/${AccountID}/data/rest/json/v2/`;

const UTCTime = (new Date()).getTime();

const FolderID = '724398721295919716'; //Chats folder
const ServiceTypeID = '1'; //Chats sign-in service

const away = 1; //Agent's away status
const available = 2; //Agent's available status

let numberOfChats = 0;
let totalNumberOfDesktopVisitors = 0;
let totalNumberOfMobileVisitors = 0;

class Bold360APICalls extends Component {
    state = {
        totalNumberOfChats: 0,
        totalNumberOfDesktopVisitors: 0,
        totalNumberOfMobileVisitors: 0,
        chatOperators: [],
        nextPageChats: '',
        nextPageVisits: ''
    };

    componentDidMount() {
        this.fetchBold360APIData();
    }

    generateURL = requestType => {
        const auth = `${AccountID}:${APISettingID}:${UTCTime}`;
        const authHash = `${auth}:${CryptoJS.SHA512(`${auth}${APIkey}`).toString(CryptoJS.enc.Hex)}`;
        return `${url}${requestType}?auth=${authHash}`;
    };

    fetchBold360APIData = () => {
        this.getTotalNumberOfChats();
        this.getTotalNumberOfVisits();
        this.getChatOperators();
    };

    getTotalNumberOfChats = () => {
        const { nextPageChats } = this.state;
        axios.get(`${this.generateURL('getAllChatMessages')}${nextPageChats ? `&NextPage=${nextPageChats}` : ''}`)
            .then(({ data }) => {
                numberOfChats += data.Data.length;
                this.setState({
                    nextPageChats: data.NextPage
                });
                if (!data.NextPage) {
                    this.setState({
                        totalNumberOfChats: numberOfChats
                    });
                    return;
                } else {
                    this.getTotalNumberOfChats();
                }
            })
            .catch(error => console.error(error));
    };

    getTotalNumberOfVisits = () => {
        const { nextPageVisits } = this.state;
        axios.get(`${this.generateURL('getInactiveChats')}&FolderID=${FolderID}${nextPageVisits ? `&NextPage=${nextPageVisits}` : ''}`)
            .then(({ data }) => {
                if (data.Data) {
                    data.Data.forEach(chat => {
                        const clientType = chat.ClientType;
                        clientType === 0 || clientType === 1 ? totalNumberOfDesktopVisitors++ : totalNumberOfMobileVisitors++;
                    });
                    this.setState({
                        nextPageVisits: data.NextPage
                    });
                }
                if (!data.NextPage) {
                    this.setState({
                        totalNumberOfDesktopVisitors,
                        totalNumberOfMobileVisitors
                    });
                    return;
                } else {
                    this.getTotalNumberOfVisits();
                }
            })
            .catch(error => console.error(error));
    };

    getChatOperators = () => {
        axios.get(`${this.generateURL('getOperatorAvailability')}&ServiceTypeID=${ServiceTypeID}`)
            .then(({ data }) => {
                if (data.Data)
                    this.setState({ chatOperators: data.Data });
            })
            .catch(error => console.error(error));
    };

    switchOperatorLoginStatus = (operatorID, clientID, currentLoginStatus) => {
        const { chatOperators } = this.state;
        const toggleStatus = currentLoginStatus === away ? available : away;
        axios.post(`${this.generateURL('setOperatorAvailability')}&OperatorID=${operatorID}&ClientID=${clientID}&ServiceTypeID=${ServiceTypeID}&StatusType=${toggleStatus}`)
            .then(({ data }) => {
                if (data.Status === "success") {
                    let operatorInfo = '';
                    chatOperators.forEach(operator => {
                        if (operator.LoginID === operatorID && operator.ClientID === clientID) {
                            operator.StatusType = toggleStatus;
                            operatorInfo = `${operator.Name} (username: ${operator.UserName})`;
                        }
                    });
                    this.setState({ chatOperators });
                    Alert.success(`Agent ${operatorInfo} is now ${toggleStatus === available ? 'Available' : 'Away'}`, {
                        position: 'bottom-right',
                        effect: 'slide',
                        timeout: 'none'
                    });
                } else {
                    Alert.error(`Something went wrong! Unable to change Agent's availability status. Please try again!`, {
                        position: 'bottom-right',
                        effect: 'slide',
                        timeout: 'none'
                    });
                }
            })
            .catch(error => console.error(error));
    };

    render() {
        return (
            <Dashboard
                totalNumberOfChats={this.state.totalNumberOfChats}
                totalNumberOfDesktopVisitors={this.state.totalNumberOfDesktopVisitors}
                totalNumberOfMobileVisitors={this.state.totalNumberOfMobileVisitors}
                chatOperators={this.state.chatOperators}
                toggleStatusHandler={this.switchOperatorLoginStatus}
            />
        );
    }

}

export default Bold360APICalls;