import { useRoutes } from 'react-router-dom';
import routes from './router'
function App(){
  return (
    <div>
     {useRoutes(routes)} 
    </div>
   
  )
}

export default App