import {TailSpin} from 'react-loader-spinner'
import './index.css'


const Loader=()=>(
    <div className='loader-container'>
        <TailSpin color="grey" height={40} width={40}/>
    </div>
)

export default Loader