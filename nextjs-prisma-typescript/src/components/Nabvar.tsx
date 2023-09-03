// NOTA: Para la navegación usando link en el navbar usamos un componente propio de 
//       NextJS que es el Link
import Link from "next/link"

function Nabvar() {
  return (
    <nav>
        <h3>NextJSCRUD</h3>

        <ul>
            <li>
                <Link href="/new">
                    Nueva
                </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nabvar