import { ad } from 'tns-core-modules/utils/utils';
import { CastButtonBase } from './cast.common';

const {
  MediaRouter,
  MediaRouteSelector,
  MediaControlIntent
} = android.support.v7.media;
const {
  CastButtonFactory,
  CastContext,
  Session
} = com.google.android.gms.cast.framework;

class MediaRouterCallback extends android.support.v7.media.MediaRouter.Callback {
  public owner: CastButton;

  constructor(owner) {
    super();

    this.owner = owner;

    return global.__native(this);
  }

  public onProviderAdded(router, provider): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onProviderAdded',
      router: router,
      provider: provider
    });
  }

  public onProviderChanged(router, provider): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onProviderChanged',
      router: router,
      provider: provider
    });
  }

  public onProviderRemoved(router, provider): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onProviderRemoved',
      router: router,
      provider: provider
    });
  }

  public onRouteAdded(router, route): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteAdded',
      router: router,
      route: route
    });
  }

  public onRouteChanged(router, route): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteChanged',
      router: router,
      route: route
    });
  }

  public onRoutePresentationDisplayChanged(router, route): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onProviderChanged',
      router: router,
      route: route
    });
  }

  public onRouteRemoved(router, route): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteRemoved',
      router: router,
      route: route
    });
  }

  public onRouteSelected(router, info): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteSelected',
      router: router,
      info: info
    });
  }

  public onRouteUnselected(router, info): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteUnselected',
      router: router,
      info: info
    });
  }

  public onRouteVolumeChanged(router, route): void {
    this.owner.notify({
      eventName: CastButtonBase.mediaRouterEventEvent,
      object: this.owner,
      mediaRouterEventName: 'onRouteVolumeChanged',
      router: router,
      route: route
    });
  }
}

@Interfaces([com.google.android.gms.cast.framework.SessionManagerListener])
class SessionManagerListenerImpl extends java.lang.Object implements com.google.android.gms.cast.framework.SessionManagerListener<com.google.android.gms.cast.framework.Session> {
  public owner: CastButton;

  constructor(owner) {
    super();

    this.owner = owner;

    // necessary when extending TypeScript constructors
    return global.__native(this);
  }

  onSessionEnded(session, error): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionEnded',
      session: session,
      error: error
    });
  }

  onSessionEnding(session): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionEnding',
      session: session
    });
  }

  onSessionResumeFailed(session, error) {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionResumeFailed',
      session: session,
      error: error
    });
  }

  onSessionResumed(session, wasSuspended) {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionResumed',
      session: session,
      wasSuspended: wasSuspended
    });
  }

  onSessionResuming(session, sessionId): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionResuming',
      session: session,
      sessionId: sessionId
    });
  }

  onSessionStartFailed(session, error): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionStartFailed',
      session: session,
      error: error
    });
  }

  onSessionStarted(session, sessionId): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionStarted',
      session: session,
      sessionId: sessionId
    });
  }

  onSessionStarting(session): void {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionStarting',
      session: session
    });
  }

  onSessionSuspended(session, reason) {
    this.owner.notify({
      eventName: CastButtonBase.sessionEventEvent,
      object: this.owner,
      sessionEventName: 'onSessionSuspended',
      session: session,
      reason: reason
    });
  }
}

export class CastButton extends CastButtonBase {
  nativeView: android.support.v7.app.MediaRouteButton;

  public mCastContext: com.google.android.gms.cast.framework.CastContext;
  public mSessionManager: com.google.android.gms.cast.framework.SessionManager;
  public mSessionManagerListener: com.google.android.gms.cast.framework.SessionManagerListener<com.google.android.gms.cast.framework.Session>;

  public mMediaRouter: android.support.v7.media.MediaRouter;
  public mMediaRouterCallback: android.support.v7.media.MediaRouter.Callback;
  public mMediaRouteSelector: android.support.v7.media.MediaRouteSelector;

  /**
   * Creates new native button.
   */
  public createNativeView(): Object {
    const appContext = ad.getApplicationContext();

    // Create new instance of MediaRouteButton
    this.nativeView = new android.support.v7.app.MediaRouteButton(this._context);

    // Wire up the MediaRouteButton to the Cast framework
    CastButtonFactory.setUpMediaRouteButton(appContext, this.nativeView);

    // Create media router
    this.mMediaRouter = MediaRouter.getInstance(appContext);
    this.mMediaRouteSelector = new MediaRouteSelector.Builder()
      .addControlCategory(MediaControlIntent.CATEGORY_LIVE_VIDEO)
      .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
      .build();
    this.mMediaRouterCallback = new MediaRouterCallback(this);

    // Get cast context and session manager
    this.mCastContext = CastContext.getSharedInstance(appContext);
    this.mSessionManager = this.mCastContext.getSessionManager();
    this.mSessionManagerListener = new SessionManagerListenerImpl(this);

    this.addMediaRouterCallback();
    this.addSessionManagerListener();

    return this.nativeView;
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.
    (<any>this.nativeView).owner = this;

    super.initNativeView();
  }

  /**
   * Clean up references to the native view and resets nativeView to its original state.
   * If you have changed nativeView in some other way except through setNative callbacks
   * you have a chance here to revert it back to its original state
   * so that it could be reused later.
   */
  disposeNativeView(): void {
    // Remove reference from native view to this instance.
    (<any>this.nativeView).owner = null;

    this.removeMediaRouterCallback();
    this.removeSessionManagerListener();

    // If you want to recycle nativeView and have modified the nativeView
    // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
    // you have to reset it to its initial state here.
    super.disposeNativeView();
  }

  addMediaRouterCallback(): void {
    this.mMediaRouter.addCallback(this.mMediaRouteSelector, this.mMediaRouterCallback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY);
  }

  removeMediaRouterCallback(): void {
    if (this.mMediaRouter && this.mMediaRouterCallback) {
      this.mMediaRouter.removeCallback(this.mMediaRouterCallback);
    }
  }

  addSessionManagerListener(): void {
    this.mSessionManager.addSessionManagerListener(this.mSessionManagerListener);
  }

  removeSessionManagerListener(): void {
    this.mSessionManager.removeSessionManagerListener(this.mSessionManagerListener);
  }
}
