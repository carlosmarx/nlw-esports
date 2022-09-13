import './styles/main.css'
import Logo from './assets/logo.svg';
function App() {
  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src={Logo} alt="Logo" />
      
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.</h1>
    </div>
  )
}

export default App
