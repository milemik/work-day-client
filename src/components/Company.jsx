import { Link } from 'react-router';

export default function Company({ company }) {
    return (
        <li key={company.uuid} className="text-2xl bg-blue-300 rounded-2xl p-4"><Link to={company.uuid}><p className='test-xl font-bold'>{company.name}</p> <p className='text-sm'>{company.type}</p></Link></li>
    )
}
