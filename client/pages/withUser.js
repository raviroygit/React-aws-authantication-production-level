import axios from 'axios';
import { API } from '../config';
import { getCookie } from '../helpers/auth';

const withUser = Page => {
    const WithAuthUser = props => <Page {...props} />;
    WithAuthUser.getInitialProps = async context => {
        const token = getCookie('token', context.req);
        let user = null;

        if (token) {
            try {
                const response = await axios.get(`${API}/user`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    }
                });
                user = response.data;
            } catch (error) {
                if (error.response.status === 401) {
                    user = null;
                }
            }
        }

        if (user === null) {
            // redirect
            context.res.writeHead(302, {
                Location: '/'
            });
            context.res.end();
        } else {
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}),
                user,
                token
            };
        }
    };

    return WithAuthUser;
};

export default withUser;
