import propsCode from '../components/Props/Props.jsx?raw'
import stateCode from '../components/State/State.jsx?raw'
import conditionalCode from '../components/Small Topics/Conditional_Rendering.jsx?raw'
import controlledCode from '../components/1.ControlledComp.jsx?raw'
import uncontrolledCode from '../components/2.UnControlledComp.jsx?raw'
import formsCode from '../components/Controller Component/ControllerComponent.jsx?raw'
import refCode from '../components/Small Topics/Ref.jsx?raw'
import forwardRefCode from '../components/3.ForwardRef.jsx?raw'
import useStateCode from '../components/4.UseState.jsx?raw'
import useEffectCode from '../components/5.useEffect.jsx?raw'
import useMemoCode from '../components/8.UseMemo.jsx?raw'
import useMemoParentCode from '../components/6.useMemo.jsx?raw'
import reactMemoCode from '../components/7.React.Memo.jsx?raw'
import useCallbackCode from '../components/UseCallback/Parent.jsx?raw'
import customHookCode from '../components/CustomeHook/CustomeHook.jsx?raw'
import lazyLoadingCode from '../components/Lazy Loading/LazyLoading.jsx?raw'
import protectedRoutingCode from '../components/Protected Routing/ProtectedRouter.jsx?raw'

const codeMap = {
  props: propsCode,
  state: stateCode,
  'conditional-rendering': conditionalCode,
  'controlled-components': controlledCode,
  'uncontrolled-components': uncontrolledCode,
  forms: formsCode,
  'use-ref': refCode,
  'forward-ref': forwardRefCode,
  'use-state': useStateCode,
  'use-effect': useEffectCode,
  'use-memo': useMemoCode,
  'use-memo-parent': useMemoParentCode,
  'react-memo': reactMemoCode,
  'use-callback': useCallbackCode,
  'custom-hook': customHookCode,
  'lazy-loading': lazyLoadingCode,
  'protected-routing': protectedRoutingCode,
}

export function getTopicCode(topicId) {
  return codeMap[topicId] ?? ''
}
