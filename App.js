//import library 
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Card, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBDqXVzuXutZ6toFlwYFTn9GAoqo6aAcjk',
            authDomain: 'authentication-838bd.firebaseapp.com',
            databaseURL: 'https://authentication-838bd.firebaseio.com',
            projectId: 'authentication-838bd',
            storageBucket: 'authentication-838bd.appspot.com',
            messagingSenderId: '226918559681'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                );

            case false:
                return (                   
                    <LoginForm />                                      
                );

            default:
                return (
                    <View style={{ flexDirection: 'row' }} >
                        <Spinner size="large" />
                    </View>  
                );
        }
    }

    render() {
        return ( 
            <View>
                <Header headerText='Authentication' />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
