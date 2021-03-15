import Layout from '../../components/Layout';
import withAdmin from '../withAdmin';

const Admin = ({ user }) => <Layout>{JSON.stringify(user)}</Layout>;

export default withAdmin(Admin);
