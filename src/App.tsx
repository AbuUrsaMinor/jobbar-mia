import './App.css'
import Calendar from './components/Calendar'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <Calendar />
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Jobbar Mia - För att hålla koll på Mias arbetsschema</p>
        </footer>
      </main>
    </div>
  )
}

export default App
