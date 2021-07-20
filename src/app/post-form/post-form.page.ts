import { Component, OnInit } from '@angular/core';
import { PostService, Post} from "../services/post.service";
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {

  editing = false;
  post: Post = {
    titulo: '',
    descripcion: ''
  }

  constructor(private postService: PostService,  private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.get("postId")) {
        this.editing = true;
        this.postService
          .getPostById(paramMap.get("postId"))
          .subscribe((res) => {
            this.post = res;
            console.log(this.post)
          });
      }
    })
  }
savePost(){
  this.postService.createPosts(this.post.titulo, this.post.descripcion).subscribe(
    (res) => {
      this.router.navigate(['/posts']);
    },
    (err) => console.error(err)
  );
}
updatePost() {
  this.postService
    .updatePost(this.post.id, {
      titulo: this.post.titulo,
      descripcion: this.post.descripcion,
    })
    .subscribe((res) => {
      console.log(res);
      this.editing = false;
      this.router.navigate(["/posts"]);
    });
}
}
