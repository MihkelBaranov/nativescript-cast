import * as application from 'tns-core-modules/application';
import {
  setActivityCallbacks,
  AndroidActivityCallbacks,
} from 'tns-core-modules/ui/frame';

declare const com: any;
declare const android: any;

class MyMediaRouterCallback extends android.support.v7.media.MediaRouter.Callback {
  public onProviderAdded(router, provider): void {
    console.log('onProviderAdded');
    //console.dir(router);
    //console.dir(provider);
  }

  public onProviderChanged(router, provider): void {
    console.log('onProviderChanged');
    //console.dir(router);
    //console.dir(provider);
  }

  public onProviderRemoved(router, provider): void {
    console.log('onProviderRemoved');
  }

  public onRouteAdded(router, route): void {
    console.log('onRouteAdded');
    /*
    if (++mRouteCount == 1) {
      // Show the button when a device is discovered.
      mMediaRouteButton.setVisibility(View.VISIBLE);
    }
    */
  }

  public onRoutePresentationDisplayChanged(router, route): void {
    console.log('onRoutePresentationDisplayChanged');
  }

  public onRouteRemoved(router, route): void {
    console.log('onRouteRemoved');
    /*
    if (--mRouteCount == 0) {
      // Hide the button if there are no devices discovered.
      mMediaRouteButton.setVisibility(View.GONE);
    }
    */
  }

  public onRouteSelected(router, info): void {
    console.log('onRouteSelected');
    // Handle route selection.
    //mSelectedDevice = CastDevice.getFromBundle(info.getExtras());

    // Just display a message for now; In a real app this would be the
    // hook to connect to the selected device and launch the receiver
    // app
    /*
    Toast.makeText(MediaRouterButtonActivity.this,
      getString(R.string.todo_connect), Toast.LENGTH_LONG).show();
    */
  }

  public onRouteUnselected(router, info): void {
    console.log('onRouteUnselected: info=' + info);
    //mSelectedDevice = null;
  }

  public onRouteVolumeChanged(router, route): void {
    console.log('onRouteVolumeChanged');
  }
}

@JavaProxy('com.codelab.cast.CastActivity')
class CastActivity extends android.support.v4.app.FragmentActivity {
  private _callbacks: AndroidActivityCallbacks;

  public onCreate(savedInstanceState: android.os.Bundle): void {
    console.log('CastActivity: onCreate');
    if (!this._callbacks) {
      setActivityCallbacks(this);
    }

    const context = application.android.context.getApplicationContext();
    const MediaRouter = android.support.v7.media.MediaRouter;
    const MediaRouteSelector = android.support.v7.media.MediaRouteSelector;

    const CastMediaControlIntent = com.google.android.gms.cast.CastMediaControlIntent;

    // Get strings?
    // CastMediaControlIntent.categoryForCast(getResources().getString(R.string.app_id))

    const mMediaRouter = MediaRouter.getInstance(context);

    //const mMediaRouteSelector = new MediaRouteSelector.Builder().addControlCategory('4E0FE981').build();
    const mMediaRouteSelector = new MediaRouteSelector.Builder().addControlCategory(CastMediaControlIntent.categoryForCast('4E0FE981')).build();

    // Create a MediaRouter callback for discovery events
    const mMediaRouterCallback = new MyMediaRouterCallback();

    // Add the callback to start device discovery
    mMediaRouter.addCallback(mMediaRouteSelector, mMediaRouterCallback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY);

    //const View = android.view.View;
    //MediaRouteButton.setVisibility(View.VISIBLE);

    this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
  }

  public onSaveInstanceState(outState: android.os.Bundle): void {
    this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
  }

  public onStart(): void {
    this._callbacks.onStart(this, super.onStart);
  }

  public onStop(): void {
    this._callbacks.onStop(this, super.onStop);
  }

  public onDestroy(): void {
    this._callbacks.onDestroy(this, super.onDestroy);
  }

  public onBackPressed(): void {
    this._callbacks.onBackPressed(this, super.onBackPressed);
  }

  public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
    this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
  }

  public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
    this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
  }
}