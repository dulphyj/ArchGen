import { Injectable, signal } from '@angular/core';
import { IStepOption, TourService } from 'ngx-ui-tour-md-menu';

@Injectable({
  providedIn: 'root'
})
export class TourControllerService {

  initTour = signal<boolean>(false);

  constructor(private tourService: TourService) {
  }


  private readonly steps: IStepOption[] = [
    {
      anchorId: 'diagram',
      title: 'Bienvenido a ArchGen',
      content: 'Esta es una representación visual de la arquitectura seleccionada. Pasa el cursor sobre cada componente para ver una descripción de su propósito dentro del sistema.'
    },
    {
      anchorId: 'architecture-description',
      title: 'Descripción de la Arquitectura',
      content: 'En esta sección puedes leer una explicación detallada sobre la arquitectura utilizada. Aquí se describen sus principios, ventajas y cómo se aplican en proyectos.'
    },
    {
      anchorId: 'estructure',
      title: 'Estructura del Proyecto',
      content: 'Aquí puedes ver cómo se organizan los folders del proyecto descargable. Esta estructura está basada en la arquitectura seleccionada y refleja una separación clara por capas y responsabilidades.'
    },
    {
      anchorId: 'download',
      title: 'Descargar Proyecto',
      content: 'Haz clic en este botón para descargar una plantilla de proyecto con la arquitectura seleccionada y su estructura correspondiente.'
    },
    {
      anchorId: 'start',
      title: 'Explora Arquitecturas de Software para Iniciar tus Proyectos',
      content: 'Haz clic en una de las arquitecturas disponibles para visualizar su estructura y descargar los folders del proyecto en un .zip.',
    }
  ];

  initializeTour() {
    setTimeout(() => {
      this.tourService.initialize(this.steps, {
        enableBackdrop: true,
        backdropConfig: {
          offset: 10,
        }
      });
    }, 100)
  }

  startTour() {
    this.tourService.start();

  }

  endTour() {
    this.tourService.end$.subscribe(() => {
      this.initTour.set(false)
      window.scrollTo({ top: 0, behavior: 'smooth' });

    })
    console.log("end tour?")
  }
}
