import {NavigationState, SceneRendererProps} from 'react-native-tab-view';

export type RenderItem =
  | ((
      props: SceneRendererProps & {
        navigationState: NavigationState<{
          key: string;
          title: string;
        }>;
      },
    ) => React.ReactNode)
  | undefined;
