'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Chip from '@mui/material/Chip'

// Component Imports
import OptionMenu from '@core/components/option-menu'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useState } from 'react'
import CustomAvatar from '@core/components/mui/Avatar'
import CustomIconButton from '@core/components/mui/IconButton'
import Link from '@components/Link'

const ConnectionsTeams = props => {
  const { teamsTech, connections } = props

  const [modal, setModal] = useState({ open: false, type: '', context: '' })

  const handleMenuAction = (type, context) => {
    setModal({ open: true, type, context })
  }
  const handleClose = () => setModal({ open: false, type: '', context: '' })

  // Opciones para Connections
  const connectionOptions = [
    { text: 'Share Connections', icon: 'tabler-share', menuItemProps: { onClick: () => handleMenuAction('share', 'connections') } },
    { text: 'Suggest Edits', icon: 'tabler-edit', menuItemProps: { onClick: () => handleMenuAction('suggest', 'connections') } },
    { divider: true },
    { text: 'Report Bug', icon: 'tabler-bug', menuItemProps: { onClick: () => handleMenuAction('bug', 'connections') } }
  ]
  // Opciones para Teams
  const teamOptions = [
    { text: 'Share Teams', icon: 'tabler-share', menuItemProps: { onClick: () => handleMenuAction('share', 'teams') } },
    { text: 'Suggest Edits', icon: 'tabler-edit', menuItemProps: { onClick: () => handleMenuAction('suggest', 'teams') } },
    { divider: true },
    { text: 'Report Bug', icon: 'tabler-bug', menuItemProps: { onClick: () => handleMenuAction('bug', 'teams') } }
  ]

  const [shareValue, setShareValue] = useState('')
  const [suggestValue, setSuggestValue] = useState('')
  const [bugValue, setBugValue] = useState('')

  const [suggestions, setSuggestions] = useState([])
  const [bugs, setBugs] = useState([])

  const handleShare = () => {
    alert(`Compartido: ${shareValue || 'Enlace generado'}`)
    setShareValue('')
    handleClose()
  }
  const handleSuggest = () => {
    setSuggestions(prev => [
      { text: suggestValue, date: new Date().toLocaleString(), context: modal.context }
      , ...prev])
    setSuggestValue('')
    handleClose()
  }
  const handleBug = () => {
    setBugs(prev => [
      { text: bugValue, date: new Date().toLocaleString(), context: modal.context }
      , ...prev])
    setBugValue('')
    handleClose()
  }

  const renderModalContent = () => {
    if (modal.type === 'share') {
      return (
        <DialogContent>
          <Typography mb={2}>Puedes copiar este enlace para compartir:</Typography>
          <input
            type='text'
            value={shareValue || window?.location?.href}
            onChange={e => setShareValue(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
            readOnly
          />
          <Button variant='outlined' onClick={() => {navigator.clipboard.writeText(shareValue || window?.location?.href); alert('¡Enlace copiado!')}}>
            Copiar enlace
          </Button>
        </DialogContent>
      )
    }
    if (modal.type === 'suggest') {
      return (
        <DialogContent>
          <Typography mb={2}>Describe tu sugerencia para {modal.context === 'connections' ? 'Connections' : 'Teams'}:</Typography>
          <textarea
            value={suggestValue}
            onChange={e => setSuggestValue(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              background: 'var(--mui-palette-background-paper, #23243a)',
              color: 'var(--mui-palette-text-primary, #fff)',
              border: '1px solid var(--mui-palette-primary-main, #6366f1)',
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              outline: 'none',
              resize: 'vertical',
              marginBottom: 8
            }}
            placeholder='Escribe tu sugerencia...'
          />
        </DialogContent>
      )
    }
    if (modal.type === 'bug') {
      return (
        <DialogContent>
          <Typography mb={2}>Describe el bug encontrado en {modal.context === 'connections' ? 'Connections' : 'Teams'}:</Typography>
          <textarea
            value={bugValue}
            onChange={e => setBugValue(e.target.value)}
            rows={4}
            style={{
              width: '100%',
              background: 'var(--mui-palette-background-paper, #23243a)',
              color: 'var(--mui-palette-text-primary, #fff)',
              border: '1px solid var(--mui-palette-error-main, #f44336)',
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              outline: 'none',
              resize: 'vertical',
              marginBottom: 8
            }}
            placeholder='Describe el bug...'
          />
        </DialogContent>
      )
    }
    return null
  }

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Card sx={{ mb: 4, background: 'var(--mui-palette-background-paper, #23243a)' }}>
          <CardHeader title='Feedback & Issues' sx={{ pb: 0 }} />
          <CardContent>
            {suggestions.length === 0 && bugs.length === 0 && (
              <Typography color='text.secondary' fontSize={15}>No hay sugerencias ni bugs reportados aún.</Typography>
            )}
            {suggestions.length > 0 && (
              <>
                <Typography variant='subtitle2' color='primary.main' sx={{ mt: 1, mb: 0.5 }}>Sugerencias:</Typography>
                {suggestions.map((s, i) => (
                  <Typography key={i} fontSize={15} sx={{ mb: 0.5 }}>
                    <b>{s.context === 'connections' ? 'Connections' : 'Teams'}:</b> {s.text} <span style={{ color: '#888', fontSize: 12 }}>({s.date})</span>
                  </Typography>
                ))}
              </>
            )}
            {bugs.length > 0 && (
              <>
                <Typography variant='subtitle2' color='error.main' sx={{ mt: 2, mb: 0.5 }}>Bugs reportados:</Typography>
                {bugs.map((b, i) => (
                  <Typography key={i} fontSize={15} sx={{ mb: 0.5 }}>
                    <b>{b.context === 'connections' ? 'Connections' : 'Teams'}:</b> {b.text} <span style={{ color: '#888', fontSize: 12 }}>({b.date})</span>
                  </Typography>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader
            title='Connections'
            action={<OptionMenu options={connectionOptions} />}
          />
          <CardContent className='flex flex-col gap-4'>
            {connections &&
              connections.map((connection, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div className='flex items-center flex-grow gap-2'>
                    <CustomAvatar src={connection.avatar} size={38} />
                    <div className='flex flex-grow flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {connection.name}
                      </Typography>
                      <Typography variant='body2'>{connection.connections} Connections</Typography>
                    </div>
                  </div>
                  <CustomIconButton color='primary' variant={connection.isFriend ? 'tonal' : 'contained'}>
                    <i className={connection.isFriend ? 'tabler-user-check' : 'tabler-user-x'} />
                  </CustomIconButton>
                </div>
              ))}
          </CardContent>
          <CardActions className='flex justify-center'>
            <Typography component={Link} color='primary.main'>
              View all connections
            </Typography>
          </CardActions>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardHeader
            title='Teams'
            action={<OptionMenu options={teamOptions} />}
          />
          <CardContent className='flex flex-col gap-4'>
            {teamsTech &&
              teamsTech.map((team, index) => (
                <div key={index} className='flex'>
                  <div className='flex flex-grow  items-center gap-2'>
                    <CustomAvatar src={team.avatar} size={38} />
                    <div className='flex flex-grow flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {team.title}
                      </Typography>
                      <Typography variant='body2'>{team.members} Members</Typography>
                    </div>
                  </div>
                  <Chip color={team.ChipColor} label={team.chipText} size='small' variant='tonal' />
                </div>
              ))}
          </CardContent>
          <CardActions className='flex justify-center'>
            <Typography component={Link} color='primary.main'>
              View all teams
            </Typography>
          </CardActions>
        </Card>
      </Grid>
      <Dialog open={modal.open} onClose={handleClose}>
        <DialogTitle>
          {modal.type === 'share' && (modal.context === 'connections' ? 'Share Connections' : 'Share Teams')}
          {modal.type === 'suggest' && 'Suggest Edits'}
          {modal.type === 'bug' && 'Report Bug'}
        </DialogTitle>
        {renderModalContent()}
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          {modal.type === 'share' && (
            <Button onClick={handleShare} variant='contained'>Listo</Button>
          )}
          {modal.type === 'suggest' && (
            <Button onClick={handleSuggest} variant='contained' disabled={!suggestValue.trim()}>Enviar</Button>
          )}
          {modal.type === 'bug' && (
            <Button onClick={handleBug} variant='contained' disabled={!bugValue.trim()}>Reportar</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConnectionsTeams
