import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { ApiHttpService } from './services/api-http.service';


@NgModule({
  declarations: [
    //ApiService,
  ],
  imports: [
    CommonModule, 

  ],
  providers: [
    ApiHttpService,
  ]
})

/*export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
      if (targetModule) {
          throw new Error(`${targetModule.constructor.name} has already been loaded.`);
      }
  }
}*/

export class CoreModule{
  public constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

