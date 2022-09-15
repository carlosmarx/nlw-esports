import { useEffect, useState } from "react";
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from "./components/GameBanner";
import './styles/main.css';
import Logo from './assets/logo.svg';
import { CreateAddBanner } from "./components/CreateAddBanner";
import { GameController } from "phosphor-react";

interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {ads: number};
}

function App() {

  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games').then(response => response.json()).then(
      data => {
        setGames(data)
      }
     
    );
  },[]);

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img src={Logo} alt="Logo" />
      
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} title={game.title} bannerUrl={game.bannerUrl} ads_count={game._count.ads}/>
          )
        })}
        
      </div>
        {/* Radix Dialog */}
      <Dialog.Root>
        <CreateAddBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor="game">Qual o Game uqer jogar?</label>
                  <input id="game" placeholder="Selecione o game que deseja jogar:" />
                </div>

                <div>
                  <label htmlFor="name">Seu nome (ou nickname)?</label>
                  <input id="name" placeholder="Como te chamam dentro do jogo?" />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                    <input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual seu discord?</label>
                    <input id="discord" placeholder="Ex: usuario#0000" />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <input id="weekDays" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  
                  <div>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div>
                      <input id="hourStart" type="time" placeholder="De" />
                      <input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>


                </div>
                <div>
                  <input type="checkbox" />
                  Costumo me conectar no chat de voz
                </div>
                <footer>
                  <button>Cancelar</button>
                  <button type="submit">
                    <GameController   />
                    Encontrar Duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
    </div>
  )
}

export default App
