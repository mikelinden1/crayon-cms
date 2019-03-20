import React from 'react';
import PropTypes from 'prop-types';

// import { Button, Alert } from 'reactstrap';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default class Login extends React.PureComponent {
    static propTypes = {
        processing: PropTypes.bool,
        error: PropTypes.string,
        actions: PropTypes.shape({
            login: PropTypes.func.isRequired
        }).isRequired
    };

    login(e) {
        e.preventDefault();

        const payload = {
            username: e.target.username.value,
            password: e.target.password.value
        };

        const { actions: { login } } = this.props;

        login(payload);
    }
    
    ErrorMsg = () => {
        return this.props.error
            ?   <Message color="red">{this.props.error}</Message>
            :   null;
    }

    render() {
        const { error, processing } = this.props;

        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%', marginTop: '30px' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' textAlign='center' style={{ textTransform: 'uppercase' }}>Login</Header>
                        <Form onSubmit={(e) => this.login(e)} size='large'>
                            <Segment stacked>
                                <Message error={true} visible={error}>{error}</Message>
                                <Form.Input fluid icon='user' name="username" iconPosition='left' placeholder='Username' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    name="password"
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
                                <Button color='blue' loading={processing} fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}