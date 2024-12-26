import { Card, CardContent, Typography, Chip, Box } from '@mui/material'
import { AiFillStar, AiFillDelete } from 'react-icons/ai'

const Favorites = () => {
  const favorites = ['제주도', '대전', '강릉']

  return (
    <Card sx={{ maxWidth: 1200, m: 'auto', borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          즐겨찾기
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {favorites.map((favorite, index) => (
            <Chip
              key={index}
              label={favorite}
              color='warning'
              icon={<AiFillStar />}
              onDelete={() => console.log(`${favorite} 삭제`)} // 삭제 이벤트
              deleteIcon={<AiFillDelete />}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default Favorites
