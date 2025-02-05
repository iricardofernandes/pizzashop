import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Search } from 'lucide-react'

export function OrderTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Button disabled variant="outline" size="xs">
            <Search className="w-3 h-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell>
          <Skeleton className="w-[172px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[148px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[110px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[200px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[64px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[92px] h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[92px] h-4" />
        </TableCell>
      </TableRow>
    )
  })
}
