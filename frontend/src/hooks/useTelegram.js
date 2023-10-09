const tg = window.Telegram.WebApp;

export function useTelegram() {
  
  const onClose = () => {
    tg.close()
  }
  
  const onToggleButton = () => {
    if(tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }
  
  const tgInitData = new URLSearchParams(decodeURIComponent(tg.initData))
  
  const queryId = tgInitData.get('query_id')
  const user = JSON.parse(tgInitData.get('user'))
  
  return {
    onClose,
    onToggleButton,
    tg,
    user,
    queryId,
  }
}
