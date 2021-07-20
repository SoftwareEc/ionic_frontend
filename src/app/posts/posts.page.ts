import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AlertController } from "@ionic/angular";



@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: any = [];


  constructor(private postService: PostService, private alertController: AlertController) {}

  loadPosts(){
    this.postService.getPosts().subscribe(
      (res) => {
      console.log(res)
      this.posts = res;
    },
      (err) => console.log(err))
  }

  ngOnInit() {
    this.loadPosts();
  }

  ionViewWillEnter() {
    this.loadPosts();
  }

  async deletePost(id){
  const alert = await this.alertController.create({
      header: 'Remove',
      subHeader: 'Remove this post',
      message: '¿Estas seguro?',
      buttons: [{
        text: 'Okay',
        handler: () =>{
     console.log(id)
      this.postService.deletePost(id).subscribe(
      (res) => {
        this.loadPosts();
      },
      (err) => console.error(err)
    )
        }
      }, 'Cancel']
    });

    await alert.present()
  }
  editPost(id: string){
    console.log(id)
  }
}
