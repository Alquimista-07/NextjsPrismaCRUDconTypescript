// NOTA: Para la navegación usando link en el navbar usamos un componente propio de 
//       NextJS que es el Link
import Link from "next/link"

function Nabvar() {
  return (
    <nav className="flex justify-between items-center py-4">
        
        <Link href="/">
          <h3 className="font-bold text-xl">NextJSCRUD</h3>
        </Link>

        <ul>
            <li>
                <Link href="/new" className="text-slate-200 hover:text-slate-400">
                    Nueva
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nabvar