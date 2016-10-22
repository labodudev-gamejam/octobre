/**
Créer par Jimmy Latour, 2016
http://labodudev.fr
*/

class Application {
  private canvas: any;
  private context: any;

  private framesPerSecond: Number = 1000 / 30;
  private lastTime: Number;

  private loader: Loader = undefined;
  /**
  * Le constructeur permet appelle LoadCanvas
  */
  constructor() {
    this.LoadCanvas();
    this.StartTimer();
    this.StartLoadData();
  }

  /**
  * Initialise le canvas avec la taille du navigateur de l'utilisateur
  */
  LoadCanvas():void {
    this.canvas = document.getElementById("canvas");
		this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight

    this.context = this.canvas.getContext('2d');

    // Initialise les évènements: souris, clavier
    EventMouse.Mouse.Event(this.canvas);
  }

  /**
  * Démarres la boucle infini du jeu, cette méthode appelle Update toutes les X secondes.
  */
  StartTimer():void {
    this.lastTime = new Date().getTime();
    setInterval( () => { this.Update(); }, this.framesPerSecond);
  }

  /**
  * Démarres le chargement des données du jeu (image, son, ..)
  */
  StartLoadData():void {
    this.loader = new Loader();
  }

  /**
  * Remplis le canvas d'une couleur uni et appelle la méthode Update et Draw de la scène actuelle.
  */
  Update():void {
    if (SceneManager.Manager.currentScene && Data.Ressources.isLoaded) {
      SceneManager.Manager.currentScene.Update();

		  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      SceneManager.Manager.currentScene.Draw(this.context);

    }
  }
}
