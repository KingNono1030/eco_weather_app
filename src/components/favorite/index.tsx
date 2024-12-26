import { Card, CardContent, Chip, Box } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { AiFillStar, AiFillDelete } from 'react-icons/ai'

const Favorites = ({
  favorites,
  onFavoriteChange,
  onLocationChange,
}: {
  favorites: (string | null)[]
  onFavoriteChange: (favoriteToRemove: string | null) => void
  onLocationChange: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <Card sx={{ maxWidth: 1200, m: 'auto', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {favorites.map((favorite) => (
            <Chip
              onClick={() => {
                onLocationChange(favorite)
              }}
              key={favorite}
              label={favorite}
              color='warning'
              icon={<AiFillStar />}
              onDelete={() => {
                onFavoriteChange(favorite)
              }}
              deleteIcon={<AiFillDelete />}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Favorites
